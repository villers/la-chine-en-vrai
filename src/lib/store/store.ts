import { configureStore } from '@reduxjs/toolkit';
import travelFormReducer from '../features/travelForm/travelFormSlice';
import newsletterReducer from '../features/newsletter/newsletterSlice';
import testimonialsReducer from '../features/testimonials/testimonialsSlice';

export const store = configureStore({
  reducer: {
    travelForm: travelFormReducer,
    newsletter: newsletterReducer,
    testimonials: testimonialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;