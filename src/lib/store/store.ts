import { configureStore, combineReducers } from '@reduxjs/toolkit';
import travelFormReducer from '../features/travelForm/travelFormSlice';
import newsletterReducer from '../features/newsletter/newsletterSlice';
import testimonialsReducer from '../features/testimonials/testimonialsSlice';
import blogReducer from '../features/blog/blogSlice';
import inspirationsReducer from '../features/inspirations/inspirationsSlice';

// Admin slices
import adminTestimonialsReducer from '../features/admin/testimonialsSlice';
import adminContactsReducer from '../features/admin/contactsSlice';
import adminNewsletterReducer from '../features/admin/newsletterSlice';
import adminTravelRequestsReducer from '../features/admin/travelRequestsSlice';

// Combine admin reducers
const adminReducer = combineReducers({
  testimonials: adminTestimonialsReducer,
  contacts: adminContactsReducer,
  newsletter: adminNewsletterReducer,
  travelRequests: adminTravelRequestsReducer,
});

export const store = configureStore({
  reducer: {
    travelForm: travelFormReducer,
    newsletter: newsletterReducer,
    testimonials: testimonialsReducer,
    blog: blogReducer,
    inspirations: inspirationsReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;