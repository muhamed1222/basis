import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '../services/portfolioService';
import { PortfolioItem, ApiResponse } from '../../shared/types';

export const usePortfolioItems = () => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: () => portfolioService.getPortfolioItems(),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: true,
  });
};

export const usePortfolioItem = (id: string) => {
  return useQuery({
    queryKey: ['portfolio', id],
    queryFn: () => portfolioService.getPortfolioItem(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreatePortfolioItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>) =>
      portfolioService.createPortfolioItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

export const useUpdatePortfolioItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; item: Partial<PortfolioItem> }) =>
      portfolioService.updatePortfolioItem(params.id, params.item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

export const useDeletePortfolioItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfolioService.deletePortfolioItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};
