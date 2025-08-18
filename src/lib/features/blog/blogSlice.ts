import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';

export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: any;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
  slug?: string;
  isPublished?: boolean;
  views?: number;
  createdAt?: any;
  updatedAt?: any;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  categories: ['Tous', 'Conseils pratiques', 'Gastronomie', 'Culture', 'Voyage', 'Témoignage']
};

export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async ({ limit = 10, category }: { limit?: number; category?: string } = {}) => {
    const { blogApi } = await import('@/lib/api');
    return await blogApi.getPosts({ 
      limit, 
      category: category !== 'Tous' ? category : undefined 
    });
  }
);

export const fetchBlogPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async (slug: string) => {
    const { blogApi } = await import('@/lib/api');
    return await blogApi.getPostBySlug(slug);
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch blog posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      })
      // Fetch single blog post
      .addCase(fetchBlogPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Article non trouvé';
      });
  }
});

export const { clearCurrentPost, clearError } = blogSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useBlogPosts = () => useAppSelector((state) => state.blog.posts);
export const useBlogCurrentPost = () => useAppSelector((state) => state.blog.currentPost);
export const useBlogLoading = () => useAppSelector((state) => state.blog.loading);
export const useBlogError = () => useAppSelector((state) => state.blog.error);
export const useBlogCategories = () => useAppSelector((state) => state.blog.categories);
export const useBlogPostsByCategory = (category: string) => useAppSelector((state) => 
  category === 'Tous' 
    ? state.blog.posts 
    : state.blog.posts.filter(post => post.category === category)
);
export const useRecentBlogPosts = (limit: number = 3) => useAppSelector((state) => 
  state.blog.posts.slice(0, limit)
);

export default blogSlice.reducer;