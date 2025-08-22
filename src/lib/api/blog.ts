import apiClient from './client';
import { BlogPost } from '@/lib/features/blog/blogSlice';

export interface BlogPostsResponse {
  success: boolean;
  blogPosts: BlogPost[];
  count: number;
}

export interface BlogPostResponse {
  success: boolean;
  blogPost: BlogPost;
}

export const blogApi = {
  // Récupérer tous les articles de blog
  getPosts: async (params?: { limit?: number; category?: string }): Promise<BlogPost[]> => {
    const response = await apiClient.get<BlogPostsResponse>('/api/blog', { params });
    return response.data.blogPosts;
  },

  // Récupérer un article par slug
  getPostBySlug: async (slug: string, preview = false): Promise<BlogPost> => {
    const params = preview ? { preview: 'true' } : {};
    const response = await apiClient.get<BlogPostResponse>(`/api/blog/${slug}`, { params });
    return response.data.blogPost;
  },

  // Créer un nouvel article
  createPost: async (postData: Partial<BlogPost>): Promise<{ id: string }> => {
    const response = await apiClient.post('/api/blog', postData);
    return response.data;
  }
};