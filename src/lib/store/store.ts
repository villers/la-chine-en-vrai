import { configureStore } from '@reduxjs/toolkit';
import travelFormReducer from '../features/travelForm/travelFormSlice';
import newsletterReducer from '../features/newsletter/newsletterSlice';
import testimonialsReducer from '../features/testimonials/testimonialsSlice';
import blogReducer from '../features/blog/blogSlice';
import inspirationsReducer from '../features/inspirations/inspirationsSlice';

export const store = configureStore({
  reducer: {
    travelForm: travelFormReducer,
    newsletter: newsletterReducer,
    testimonials: testimonialsReducer,
    blog: blogReducer,
    inspirations: inspirationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;