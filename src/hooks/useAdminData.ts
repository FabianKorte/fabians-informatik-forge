import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Generic hook for fetching and managing admin data with pagination support.
 * Handles loading states, error handling, and data refetching.
 * 
 * @template T - The type of data being fetched
 * @param {Object} options - Configuration options
 * @param {string} options.table - Supabase table name
 * @param {string} [options.orderBy] - Column to order by
 * @param {boolean} [options.ascending=false] - Sort order
 * @param {number} [options.pageSize] - Items per page for pagination
 * @param {string} [options.select='*'] - Columns to select
 * 
 * @returns {Object} Hook state and methods
 * @returns {T[]} data - Fetched data array
 * @returns {boolean} isLoading - Loading state
 * @returns {PostgrestError | null} error - Error object if fetch failed
 * @returns {() => Promise<void>} refetch - Function to refetch data
 * @returns {number} totalCount - Total number of items (for pagination)
 * 
 * @example
 * const { data, isLoading, refetch } = useAdminData<Feedback>({
 *   table: 'feedbacks',
 *   orderBy: 'created_at',
 *   ascending: false,
 *   pageSize: 10
 * });
 */
export function useAdminData<T = any>(options: {
  table: string;
  orderBy?: string;
  ascending?: boolean;
  pageSize?: number;
  select?: string;
  currentPage?: number;
}) {
  const {
    table,
    orderBy,
    ascending = false,
    pageSize,
    select = '*',
    currentPage = 1,
  } = options;

  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  /**
   * Fetches data from Supabase with optional pagination and ordering
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const abortController = new AbortController();

    try {
      // Get total count if pagination is enabled
      if (pageSize) {
        const { count } = await (supabase as any)
          .from(table)
          .select('*', { count: 'exact', head: true });
        setTotalCount(count || 0);
      }

      // Build base query
      const baseQuery = (supabase as any).from(table).select(select);
      
      // Add abort signal
      let query = baseQuery.abortSignal(abortController.signal);

      // Add ordering if specified
      if (orderBy) {
        query = query.order(orderBy, { ascending });
      }

      // Add pagination if specified
      if (pageSize) {
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
      }

      const { data: fetchedData, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setData((fetchedData as T[]) || []);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err);
        toast({
          title: 'Fehler',
          description: `Daten konnten nicht geladen werden: ${err.message}`,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }

    return () => abortController.abort();
  }, [table, orderBy, ascending, pageSize, select, currentPage, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    totalCount,
  };
}
