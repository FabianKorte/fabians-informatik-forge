import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

export interface ExamSession {
  id: string;
  category_id: string;
  started_at: string;
  completed_at?: string;
  time_limit_minutes: number;
  total_questions: number;
  correct_answers: number;
  score?: number;
  session_data: any;
}

export function useExamMode() {
  const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentSession || currentSession.completed_at) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          completeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const startExam = async (categoryId: string, timeLimitMinutes: number, totalQuestions: number) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('exam_sessions')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          time_limit_minutes: timeLimitMinutes,
          total_questions: totalQuestions,
          session_data: { answers: [] }
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSession(data);
      setTimeRemaining(timeLimitMinutes * 60);

      toast({
        title: 'Prüfung gestartet',
        description: `Du hast ${timeLimitMinutes} Minuten Zeit für ${totalQuestions} Fragen.`,
      });
    } catch (error) {
      logger.error('Error starting exam:', error);
      toast({
        title: 'Fehler',
        description: 'Die Prüfung konnte nicht gestartet werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAnswer = async (questionIndex: number, answer: any) => {
    if (!currentSession) return;

    const sessionData = currentSession.session_data;
    sessionData.answers[questionIndex] = answer;

    const { error } = await supabase
      .from('exam_sessions')
      .update({ session_data: sessionData })
      .eq('id', currentSession.id);

    if (error) {
      logger.error('Error updating answer:', error);
    } else {
      setCurrentSession({ ...currentSession, session_data: sessionData });
    }
  };

  const completeSession = async () => {
    if (!currentSession || currentSession.completed_at) return;

    setIsLoading(true);
    try {
      const score = (currentSession.correct_answers / currentSession.total_questions) * 100;

      const { error } = await supabase
        .from('exam_sessions')
        .update({
          completed_at: new Date().toISOString(),
          score
        })
        .eq('id', currentSession.id);

      if (error) throw error;

      setCurrentSession(prev => prev ? { ...prev, completed_at: new Date().toISOString(), score } : null);

      toast({
        title: 'Prüfung beendet',
        description: `Dein Ergebnis: ${score.toFixed(1)}%`,
      });
    } catch (error) {
      logger.error('Error completing exam:', error);
      toast({
        title: 'Fehler',
        description: 'Die Prüfung konnte nicht abgeschlossen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitCorrectAnswers = async (correctCount: number) => {
    if (!currentSession) return;

    const { error } = await supabase
      .from('exam_sessions')
      .update({ correct_answers: correctCount })
      .eq('id', currentSession.id);

    if (error) {
      logger.error('Error updating correct answers:', error);
    } else {
      setCurrentSession(prev => prev ? { ...prev, correct_answers: correctCount } : null);
    }
  };

  return {
    currentSession,
    timeRemaining,
    isLoading,
    startExam,
    updateAnswer,
    completeSession,
    submitCorrectAnswers
  };
}