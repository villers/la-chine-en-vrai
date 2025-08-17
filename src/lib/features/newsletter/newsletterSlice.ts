import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription à la newsletter');
    }

    return await response.json();
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
export default newsletterSlice.reducer;