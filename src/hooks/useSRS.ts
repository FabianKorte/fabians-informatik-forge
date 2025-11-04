import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { calculateNextReview, isDueForReview, SRSData } from '@/lib/srsAlgorithm';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

interface CardReview {
  id: string;
  user_id: string;
  module_id: string;
  card_index: number;
  quality: number;
  interval: number;
  easiness_factor: number;
  repetitions: number;
  next_review: string;
}

export function useSRS(moduleId: string) {
  const [reviews, setReviews] = useState<Map<number, CardReview>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, [moduleId]);

  const fetchReviews = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('card_reviews')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', moduleId);

      if (error) throw error;

      const reviewMap = new Map<number, CardReview>();
      data?.forEach(review => {
        reviewMap.set(review.card_index, review);
      });
      setReviews(reviewMap);
    } catch (error) {
      logger.error('Error fetching card reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const recordReview = async (cardIndex: number, quality: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existingReview = reviews.get(cardIndex);
      
      const currentSRS: SRSData = existingReview ? {
        interval: existingReview.interval,
        easinessFactor: existingReview.easiness_factor,
        repetitions: existingReview.repetitions,
        nextReview: new Date(existingReview.next_review),
      } : {
        interval: 1,
        easinessFactor: 2.5,
        repetitions: 0,
        nextReview: new Date(),
      };

      const newSRS = calculateNextReview(quality, currentSRS);

      const reviewData = {
        user_id: user.id,
        module_id: moduleId,
        card_index: cardIndex,
        quality,
        interval: newSRS.interval,
        easiness_factor: newSRS.easinessFactor,
        repetitions: newSRS.repetitions,
        next_review: newSRS.nextReview.toISOString(),
      };

      const { data, error } = await supabase
        .from('card_reviews')
        .upsert(reviewData, {
          onConflict: 'user_id,module_id,card_index',
        })
        .select()
        .single();

      if (error) throw error;

      const updatedReviews = new Map(reviews);
      updatedReviews.set(cardIndex, data);
      setReviews(updatedReviews);

      toast({
        title: "Fortschritt gespeichert",
        description: `Nächste Wiederholung in ${newSRS.interval} Tag(en)`,
        className: "animate-fade-in",
      });
    } catch (error) {
      logger.error('Error recording review:', error);
      toast({
        title: "Fehler",
        description: "Konnte Fortschritt nicht speichern",
        variant: "destructive",
      });
    }
  };

  const getDueCards = (totalCards: number): number[] => {
    const dueCards: number[] = [];
    for (let i = 0; i < totalCards; i++) {
      const review = reviews.get(i);
      if (!review || isDueForReview(new Date(review.next_review))) {
        dueCards.push(i);
      }
    }
    return dueCards;
  };

  const getCardSRS = (cardIndex: number): SRSData | null => {
    const review = reviews.get(cardIndex);
    if (!review) return null;
    
    return {
      interval: review.interval,
      easinessFactor: review.easiness_factor,
      repetitions: review.repetitions,
      nextReview: new Date(review.next_review),
    };
  };

  return {
    reviews,
    isLoading,
    recordReview,
    getDueCards,
    getCardSRS,
    refreshReviews: fetchReviews,
  };
}