import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';

interface NewsletterState {
  email: string;
  isSubscribing: boolean;
  subscriptionStatus: 'idle' | 'pending' | 'success' | 'error';
  message: string;
}

const initialState: NewsletterState = {
  email: '',
  isSubscribing: false,
  subscriptionStatus: 'idle',
  message: '',
};

export const subscribeToNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email: string) => {
    const { newsletterApi } = await import('@/lib/api');
    const message = await newsletterApi.subscribe(email);
    return { message };
  }
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearStatus: (state) => {
      state.subscriptionStatus = 'idle';
      state.message = '';
    },
    resetNewsletter: (state) => {
      state.email = '';
      state.subscriptionStatus = 'idle';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.isSubscribing = true;
        state.subscriptionStatus = 'pending';
        state.message = '';
      })
      .addCase(subscribeToNewsletter.fulfilled, (state) => {
        state.isSubscribing = false;
        state.subscriptionStatus = 'success';
        state.message = 'Merci ! Vous êtes maintenant abonné à notre newsletter.';
        state.email = '';
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.isSubscribing = false;
        state.subscriptionStatus = 'error';
        state.message = action.error.message || 'Une erreur est survenue. Veuillez réessayer.';
      });
  },
});

export const { setEmail, clearStatus, resetNewsletter } = newsletterSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useNewsletterEmail = () => useAppSelector((state) => state.newsletter.email);
export const useNewsletterSubscribing = () => useAppSelector((state) => state.newsletter.isSubscribing);
export const useNewsletterStatus = () => useAppSelector((state) => state.newsletter.subscriptionStatus);
export const useNewsletterMessage = () => useAppSelector((state) => state.newsletter.message);
export const useNewsletterSuccess = () => useAppSelector((state) => state.newsletter.subscriptionStatus === 'success');
export const useNewsletterError = () => useAppSelector((state) => state.newsletter.subscriptionStatus === 'error');
export const useNewsletterPending = () => useAppSelector((state) => state.newsletter.subscriptionStatus === 'pending');

export default newsletterSlice.reducer;