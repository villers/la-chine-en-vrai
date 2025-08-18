import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';

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
    const { contactApi } = await import('@/lib/api');
    
    // Convertir le format du formulaire vers le format API
    const travelRequestData = {
      firstName: formData.personalInfo.firstName,
      lastName: formData.personalInfo.lastName,
      email: formData.personalInfo.email,
      phone: formData.personalInfo.phone,
      destinations: formData.destination,
      duration: formData.duration,
      budget: formData.budget,
      travelers: formData.travelers,
      travelStyle: formData.travelType.join(', '),
      departureDate: formData.travelDates.departure,
      interests: formData.interests,
      accommodationType: formData.accommodation,
      hasSpecialRequests: !!formData.personalInfo.message,
      specialRequests: formData.personalInfo.message,
    };
    
    return await contactApi.sendTravelRequest(travelRequestData);
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

// Hooks personnalisés avec useAppSelector
export const useTravelFormData = () => useAppSelector((state) => state.travelForm.formData);
export const useTravelFormCurrentStep = () => useAppSelector((state) => state.travelForm.currentStep);
export const useTravelFormSubmitting = () => useAppSelector((state) => state.travelForm.isSubmitting);
export const useTravelFormSubmitStatus = () => useAppSelector((state) => state.travelForm.submitStatus);
export const useTravelFormSubmitMessage = () => useAppSelector((state) => state.travelForm.submitMessage);
export const useTravelFormPersonalInfo = () => useAppSelector((state) => state.travelForm.formData.personalInfo);
export const useTravelFormDestinations = () => useAppSelector((state) => state.travelForm.formData.destination);
export const useTravelFormDates = () => useAppSelector((state) => state.travelForm.formData.travelDates);
export const useTravelFormBudget = () => useAppSelector((state) => state.travelForm.formData.budget);
export const useTravelFormIsValid = () => useAppSelector((state) => {
  const { formData } = state.travelForm;
  return (
    formData.destination.length > 0 &&
    formData.personalInfo.firstName.trim() !== '' &&
    formData.personalInfo.lastName.trim() !== '' &&
    formData.personalInfo.email.trim() !== ''
  );
});
export const useTravelFormProgress = () => useAppSelector((state) => {
  const totalSteps = 5; // Ajustez selon le nombre d'étapes
  return Math.round((state.travelForm.currentStep / totalSteps) * 100);
});

export default travelFormSlice.reducer;