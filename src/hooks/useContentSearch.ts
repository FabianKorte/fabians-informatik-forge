import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';
import type { LearnModule } from '@/types/learn';

export function useContentSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{
    module: LearnModule;
    category_id: string;
    title: string;
    rank: number;
  }>>([]);
  const { toast } = useToast();

  const searchContent = async (query: string, tags?: string[]) => {
    if (!query.trim() && (!tags || tags.length === 0)) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      let searchQuery = supabase
        .from('learn_modules')
        .select('*, category_id, title, content');

      // Full-text search if query provided
      if (query.trim()) {
        searchQuery = searchQuery.textSearch('search_vector', query, {
          type: 'websearch',
          config: 'german'
        });
      }

      // Filter by tags if provided
      if (tags && tags.length > 0) {
        const { data: taggedModules } = await supabase
          .from('module_tags')
          .select('module_id')
          .in('tag_id', tags);

        if (taggedModules && taggedModules.length > 0) {
          const moduleIds = taggedModules.map(t => t.module_id);
          searchQuery = searchQuery.in('id', moduleIds);
        } else {
          // No modules found with these tags
          setSearchResults([]);
          setIsSearching(false);
          return;
        }
      }

      const { data, error } = await searchQuery.limit(50);

      if (error) {
        logger.error('Search error:', error);
        toast({
          title: 'Fehler bei der Suche',
          description: 'Die Suche konnte nicht durchgeführt werden.',
          variant: 'destructive',
        });
        return;
      }

      const results = data.map((item: any) => ({
        module: item.content as LearnModule,
        category_id: item.category_id,
        title: item.title,
        rank: 1 // Could be enhanced with actual ranking
      }));

      setSearchResults(results);
    } catch (error) {
      logger.error('Search error:', error);
      toast({
        title: 'Fehler bei der Suche',
        description: 'Ein unerwarteter Fehler ist aufgetreten.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchContent,
    searchResults,
    isSearching,
    clearResults: () => setSearchResults([])
  };
}