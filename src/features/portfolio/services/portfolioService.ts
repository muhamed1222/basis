import axios, { AxiosError } from 'axios';
import { PortfolioItem } from '../../../types';

const API_URL = process.env['VITE_API_URL'] || 'http://localhost:3000/api';

export const portfolioService = {
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    try {
      const response = await axios.get<PortfolioItem[]>(`${API_URL}/portfolio`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.response?.data?.message || axiosError.message || 'Failed to fetch portfolio items');
    }
  },

  async getPortfolioItem(id: string): Promise<PortfolioItem> {
    try {
      const response = await axios.get<PortfolioItem>(`${API_URL}/portfolio/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.response?.data?.message || axiosError.message || 'Failed to fetch portfolio item');
    }
  },

  async createPortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioItem> {
    try {
      const response = await axios.post<PortfolioItem>(`${API_URL}/portfolio`, item);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.response?.data?.message || 'Failed to create portfolio item');
    }
  },

  async updatePortfolioItem(id: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    try {
      const response = await axios.put<PortfolioItem>(`${API_URL}/portfolio/${id}`, item);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.response?.data?.message || 'Failed to update portfolio item');
    }
  },

  async deletePortfolioItem(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/portfolio/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.response?.data?.message || 'Failed to delete portfolio item');
    }
  },
};
