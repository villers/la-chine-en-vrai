import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  type Testimonial,
  type CreateTestimonialData 
} from '@/lib/firebase/testimonials';

interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitStatus: 'idle' | 'pending' | 'success' | 'error';
  submitMessage: string;
}

const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  error: null,
  submitting: false,
  submitStatus: 'idle',
  submitMessage: '',
};

// Actions asynchrones
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (limit: number = 6) => {
    const { testimonialsApi } = await import('@/lib/api');
    return await testimonialsApi.getTestimonials(limit);
  }
);

export const fetchTestimonialsByTravelType = createAsyncThunk(
  'testimonials/fetchByTravelType',
  async ({ travelType, limit }: { travelType: string; limit?: number }) => {
    const { testimonialsApi } = await import('@/lib/api');
    // Note: Cette fonctionnalité nécessiterait une extension de l'API
    return await testimonialsApi.getTestimonials(limit || 6);
  }
);

export const submitTestimonial = createAsyncThunk(
  'testimonials/submit',
  async (testimonialData: CreateTestimonialData) => {
    const { testimonialsApi } = await import('@/lib/api');
    const result = await testimonialsApi.createTestimonial(testimonialData);
    return { id: result.id, ...testimonialData };
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    clearSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitMessage = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch testimonials
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement des témoignages';
      });

    // Fetch by travel type
    builder
      .addCase(fetchTestimonialsByTravelType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonialsByTravelType.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonialsByTravelType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement des témoignages';
      });

    // Submit testimonial
    builder
      .addCase(submitTestimonial.pending, (state) => {
        state.submitting = true;
        state.submitStatus = 'pending';
        state.submitMessage = '';
      })
      .addCase(submitTestimonial.fulfilled, (state) => {
        state.submitting = false;
        state.submitStatus = 'success';
        state.submitMessage = 'Merci ! Votre témoignage a été envoyé et sera publié après modération.';
      })
      .addCase(submitTestimonial.rejected, (state, action) => {
        state.submitting = false;
        state.submitStatus = 'error';
        state.submitMessage = action.error.message || 'Erreur lors de l\'envoi du témoignage';
      });
  },
});

export const { clearSubmitStatus, clearError } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;