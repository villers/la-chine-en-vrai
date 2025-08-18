import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';
import { adminTravelRequestsApi } from '@/lib/api/admin';

// Types pour les demandes de voyage
export interface TravelRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  duration: string;
  startDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  accommodationType: string;
  transportPreference: string;
  specialRequests?: string;
  status: 'new' | 'processed';
  createdAt: any;
}

interface TravelRequestsState {
  travelRequests: TravelRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: TravelRequestsState = {
  travelRequests: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTravelRequests = createAsyncThunk(
  'adminTravelRequests/fetchTravelRequests',
  async () => {
    const data = await adminTravelRequestsApi.getAllTravelRequests();
    return Array.isArray(data.travelRequests) ? data.travelRequests : [];
  }
);

export const markTravelRequestAsProcessed = createAsyncThunk(
  'adminTravelRequests/markTravelRequestAsProcessed',
  async (id: string) => {
    await adminTravelRequestsApi.markTravelRequestAsProcessed(id);
    return id;
  }
);

export const deleteTravelRequest = createAsyncThunk(
  'adminTravelRequests/deleteTravelRequest',
  async (id: string) => {
    await adminTravelRequestsApi.deleteTravelRequest(id);
    return id;
  }
);

// Slice
const travelRequestsSlice = createSlice({
  name: 'adminTravelRequests',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravelRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.travelRequests = action.payload;
      })
      .addCase(fetchTravelRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(markTravelRequestAsProcessed.fulfilled, (state, action) => {
        const request = state.travelRequests.find(r => r.id === action.payload);
        if (request) {
          request.status = 'processed';
        }
      })
      .addCase(deleteTravelRequest.fulfilled, (state, action) => {
        state.travelRequests = state.travelRequests.filter(r => r.id !== action.payload);
      });
  },
});

export const { clearError } = travelRequestsSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useTravelRequests = () => useAppSelector((state) => state.admin.travelRequests.travelRequests);
export const useTravelRequestsLoading = () => useAppSelector((state) => state.admin.travelRequests.loading);
export const useTravelRequestsError = () => useAppSelector((state) => state.admin.travelRequests.error);
export const useNewTravelRequests = () => useAppSelector((state) => 
  state.admin.travelRequests.travelRequests.filter((r: TravelRequest) => r.status === 'new'));
export const useProcessedTravelRequests = () => useAppSelector((state) => 
  state.admin.travelRequests.travelRequests.filter((r: TravelRequest) => r.status === 'processed'));

export default travelRequestsSlice.reducer;