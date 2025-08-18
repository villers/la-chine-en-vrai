import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Itinerary {
  title: string;
  duration: string;
  highlights: string[];
  description: string;
  price: string;
}

export interface InspirationCategory {
  id?: string;
  categoryId: string;
  title: string;
  description: string;
  image: string;
  itineraries: Itinerary[];
  isActive?: boolean;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
}

interface InspirationsState {
  categories: InspirationCategory[];
  currentCategory: InspirationCategory | null;
  loading: boolean;
  error: string | null;
}

const initialState: InspirationsState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null
};

export const fetchInspirations = createAsyncThunk(
  'inspirations/fetchCategories',
  async () => {
    const { inspirationsApi } = await import('@/lib/api');
    return await inspirationsApi.getCategories();
  }
);

export const fetchInspirationByCategory = createAsyncThunk(
  'inspirations/fetchByCategory',
  async (categoryId: string) => {
    const { inspirationsApi } = await import('@/lib/api');
    return await inspirationsApi.getCategoryById(categoryId);
  }
);

const inspirationsSlice = createSlice({
  name: 'inspirations',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all inspirations
      .addCase(fetchInspirations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInspirations.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchInspirations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      })
      // Fetch single inspiration category
      .addCase(fetchInspirationByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInspirationByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload;
      })
      .addCase(fetchInspirationByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Inspiration non trouvée';
      });
  }
});

export const { clearCurrentCategory, clearError } = inspirationsSlice.actions;
export default inspirationsSlice.reducer;