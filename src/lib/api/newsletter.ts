import apiClient from './client';

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const newsletterApi = {
  // S'abonner à la newsletter
  subscribe: async (email: string, source: string = 'website'): Promise<string> => {
    const response = await apiClient.post<NewsletterResponse>('/api/newsletter', {
      email,
      source
    });
    return response.data.message;
  }
};