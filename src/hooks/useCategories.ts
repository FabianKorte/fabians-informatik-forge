import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  title: string;
}

export const useCategories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async ({ signal }) => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, title')
        .order('id')
        .abortSignal(signal);

      if (error) throw error;
      return data as Category[];
    },
  });

  return {
    categories,
    isLoading,
  };
};
