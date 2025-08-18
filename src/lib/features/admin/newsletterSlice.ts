import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';
import { adminNewsletterApi } from '@/lib/api/admin';

// Types pour les abonnés newsletter
export interface Subscriber {
  id: string;
  email: string;
  createdAt: any;
}

interface NewsletterState {
  subscribers: Subscriber[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsletterState = {
  subscribers: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchSubscribers = createAsyncThunk(
  'adminNewsletter/fetchSubscribers',
  async () => {
    const data = await adminNewsletterApi.getAllSubscribers();
    return Array.isArray(data.subscribers) ? data.subscribers : [];
  }
);

export const deleteSubscriber = createAsyncThunk(
  'adminNewsletter/deleteSubscriber',
  async (id: string) => {
    await adminNewsletterApi.deleteSubscriber(id);
    return id;
  }
);

// Slice
const newsletterSlice = createSlice({
  name: 'adminNewsletter',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers = action.payload;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.subscribers = state.subscribers.filter(s => s.id !== action.payload);
      });
  },
});

export const { clearError } = newsletterSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useSubscribers = () => useAppSelector((state) => state.admin.newsletter.subscribers);
export const useNewsletterLoading = () => useAppSelector((state) => state.admin.newsletter.loading);
export const useNewsletterError = () => useAppSelector((state) => state.admin.newsletter.error);
export const useSubscribersThisMonth = () => useAppSelector((state) => {
  const now = new Date();
  return state.admin.newsletter.subscribers.filter((s: Subscriber) => {
    const date = new Date(s.createdAt?.seconds * 1000);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
});

export default newsletterSlice.reducer;