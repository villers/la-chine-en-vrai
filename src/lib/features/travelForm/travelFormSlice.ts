import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface TravelFormData {
  destination: string[];
  travelType: string[];
  budget: string;
  duration: string;
  travelers: number;
  travelDates: {
    departure: string;
    return: string;
  };
  interests: string[];
  accommodation: string;
  transportation: string[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
}

interface TravelFormState {
  formData: TravelFormData;
  currentStep: number;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'pending' | 'success' | 'error';
  submitMessage: string;
}

const initialState: TravelFormState = {
  formData: {
    destination: [],
    travelType: [],
    budget: '',
    duration: '',
    travelers: 2,
    travelDates: {
      departure: '',
      return: '',
    },
    interests: [],
    accommodation: '',
    transportation: [],
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  },
  currentStep: 1,
  isSubmitting: false,
  submitStatus: 'idle',
  submitMessage: '',
};

export const submitTravelForm = createAsyncThunk(
  'travelForm/submit',
  async (formData: TravelFormData) => {
    const response = await fetch('/api/travel-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du formulaire');
    }

    return await response.json();
  }
);

const travelFormSlice = createSlice({
  name: 'travelForm',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<TravelFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<TravelFormData['personalInfo']>>) => {
      state.formData.personalInfo = { ...state.formData.personalInfo, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.currentStep = 1;
      state.submitStatus = 'idle';
      state.submitMessage = '';
    },
    clearSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTravelForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitStatus = 'pending';
        state.submitMessage = '';
      })
      .addCase(submitTravelForm.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submitStatus = 'success';
        state.submitMessage = 'Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.';
      })
      .addCase(submitTravelForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitStatus = 'error';
        state.submitMessage = action.error.message || 'Une erreur est survenue. Veuillez réessayer.';
      });
  },
});

export const {
  updateFormData,
  updatePersonalInfo,
  setCurrentStep,
  nextStep,
  previousStep,
  resetForm,
  clearSubmitStatus,
} = travelFormSlice.actions;

export default travelFormSlice.reducer;