import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const speak = useCallback(async (text: string) => {
    try {
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // Use Web Speech API as fallback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          toast({
            title: 'Fehler',
            description: 'Text-to-Speech konnte nicht gestartet werden.',
            variant: 'destructive',
          });
        };

        window.speechSynthesis.speak(utterance);
      } else {
        toast({
          title: 'Nicht unterstützt',
          description: 'Dein Browser unterstützt Text-to-Speech nicht.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      logger.error('Text-to-Speech error:', error);
      toast({
        title: 'Fehler',
        description: 'Text-to-Speech konnte nicht gestartet werden.',
        variant: 'destructive',
      });
      setIsPlaying(false);
    }
  }, [currentAudio, toast]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsPlaying(false);
  }, [currentAudio]);

  return {
    speak,
    stop,
    isPlaying,
  };
};
