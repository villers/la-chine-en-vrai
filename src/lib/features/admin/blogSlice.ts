import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';
import { adminBlogApi } from '@/lib/api/admin';

// Types pour les articles de blog admin
export interface AdminBlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt?: any;
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

export interface BlogPostUpdate {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  image?: string;
  isPublished?: boolean;
}

interface AdminBlogState {
  posts: AdminBlogPost[];
  currentPost: AdminBlogPost | null;
  loading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: AdminBlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  categories: ['Conseils pratiques', 'Gastronomie', 'Culture', 'Voyage', 'Témoignage']
};

// Async Thunks pour l'admin blog
export const fetchBlogPostsAdmin = createAsyncThunk(
  'adminBlog/fetchPosts',
  async ({ includeUnpublished = true }: { includeUnpublished?: boolean } = {}) => {
    const data = await adminBlogApi.getAllPosts(includeUnpublished);
    return Array.isArray(data.posts) ? data.posts : [];
  }
);

export const createBlogPost = createAsyncThunk(
  'adminBlog/createPost',
  async (postData: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await adminBlogApi.createPost(postData);
  }
);

export const updateBlogPost = createAsyncThunk(
  'adminBlog/updatePost',
  async ({ id, updates }: { id: string; updates: BlogPostUpdate }) => {
    await adminBlogApi.updatePost(id, updates);
    return { id, updates };
  }
);

export const deleteBlogPost = createAsyncThunk(
  'adminBlog/deletePost',
  async (id: string) => {
    await adminBlogApi.deletePost(id);
    return id;
  }
);

export const fetchBlogPostById = createAsyncThunk(
  'adminBlog/fetchPostById',
  async (id: string) => {
    return await adminBlogApi.getPostById(id);
  }
);

// Slice
const adminBlogSlice = createSlice({
  name: 'adminBlog',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchBlogPostsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPostsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      // Create post
      .addCase(createBlogPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors de la création';
      })
      // Update post
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const post = state.posts.find(p => p.id === id);
        if (post) {
          Object.assign(post, updates);
        }
        if (state.currentPost && state.currentPost.id === id) {
          Object.assign(state.currentPost, updates);
        }
      })
      // Delete post
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost = null;
        }
      })
      // Fetch post by ID
      .addCase(fetchBlogPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Article non trouvé';
      });
  },
});

export const { clearCurrentPost, clearError, setCurrentPost } = adminBlogSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useAdminBlogPosts = () => useAppSelector((state) => state.admin.blog.posts);
export const useAdminBlogCurrentPost = () => useAppSelector((state) => state.admin.blog.currentPost);
export const useAdminBlogLoading = () => useAppSelector((state) => state.admin.blog.loading);
export const useAdminBlogError = () => useAppSelector((state) => state.admin.blog.error);
export const useAdminBlogCategories = () => useAppSelector((state) => state.admin.blog.categories);
export const usePublishedBlogPosts = () => useAppSelector((state) => 
  state.admin.blog.posts.filter(post => post.isPublished)
);
export const useUnpublishedBlogPosts = () => useAppSelector((state) => 
  state.admin.blog.posts.filter(post => !post.isPublished)
);
export const useBlogPostsByCategory = (category: string) => useAppSelector((state) => 
  state.admin.blog.posts.filter(post => post.category === category)
);

export default adminBlogSlice.reducer;