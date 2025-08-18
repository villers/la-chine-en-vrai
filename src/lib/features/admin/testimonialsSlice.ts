import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';
import { adminTestimonialsApi } from '@/lib/api/admin';

// Types pour les témoignages
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  isPublished: boolean;
  createdAt: any;
}

export interface TestimonialUpdate {
  isPublished?: boolean;
}

interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTestimonials = createAsyncThunk(
  'adminTestimonials/fetchTestimonials',
  async () => {
    return await adminTestimonialsApi.getAllTestimonials();
  }
);

export const updateTestimonial = createAsyncThunk(
  'adminTestimonials/updateTestimonial',
  async ({ id, updates }: { id: string; updates: TestimonialUpdate }) => {
    await adminTestimonialsApi.updateTestimonial(id, updates);
    return { id, updates };
  }
);

export const deleteTestimonial = createAsyncThunk(
  'adminTestimonials/deleteTestimonial',
  async (id: string) => {
    await adminTestimonialsApi.deleteTestimonial(id);
    return id;
  }
);

// Slice
const testimonialsSlice = createSlice({
  name: 'adminTestimonials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const testimonial = state.testimonials.find(t => t.id === id);
        if (testimonial) {
          Object.assign(testimonial, updates);
        }
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
      });
  },
});

export const { clearError } = testimonialsSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useTestimonials = () => useAppSelector((state) => state.admin.testimonials.testimonials);
export const useTestimonialsLoading = () => useAppSelector((state) => state.admin.testimonials.loading);
export const useTestimonialsError = () => useAppSelector((state) => state.admin.testimonials.error);
export const usePublishedTestimonials = () => useAppSelector((state) => 
  state.admin.testimonials.testimonials.filter((t: Testimonial) => t.isPublished));
export const useUnpublishedTestimonials = () => useAppSelector((state) => 
  state.admin.testimonials.testimonials.filter((t: Testimonial) => !t.isPublished));

export default testimonialsSlice.reducer;