import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  adminTestimonialsApi, 
  adminContactsApi, 
  adminNewsletterApi, 
  adminTravelRequestsApi 
} from '@/lib/api/admin';

// Types
interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  isPublished: boolean;
  createdAt: any;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'processed';
  createdAt: any;
}

interface Subscriber {
  id: string;
  email: string;
  createdAt: any;
}

interface TravelRequest {
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

interface AdminState {
  // Testimonials
  testimonials: Testimonial[];
  testimonialsLoading: boolean;
  testimonialsError: string | null;

  // Contacts
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: string | null;

  // Newsletter
  subscribers: Subscriber[];
  newsletterLoading: boolean;
  newsletterError: string | null;

  // Travel Requests
  travelRequests: TravelRequest[];
  travelRequestsLoading: boolean;
  travelRequestsError: string | null;

  // UI State
  selectedItem: string | null;
  actionLoading: boolean;
}

const initialState: AdminState = {
  testimonials: [],
  testimonialsLoading: false,
  testimonialsError: null,

  contacts: [],
  contactsLoading: false,
  contactsError: null,

  subscribers: [],
  newsletterLoading: false,
  newsletterError: null,

  travelRequests: [],
  travelRequestsLoading: false,
  travelRequestsError: null,

  selectedItem: null,
  actionLoading: false,
};

// Async Thunks pour les témoignages
export const fetchTestimonials = createAsyncThunk(
  'admin/fetchTestimonials',
  async () => {
    return await adminTestimonialsApi.getAllTestimonials();
  }
);

export const updateTestimonial = createAsyncThunk(
  'admin/updateTestimonial',
  async ({ id, updates }: { id: string; updates: { isPublished?: boolean } }) => {
    await adminTestimonialsApi.updateTestimonial(id, updates);
    return { id, updates };
  }
);

export const deleteTestimonial = createAsyncThunk(
  'admin/deleteTestimonial',
  async (id: string) => {
    await adminTestimonialsApi.deleteTestimonial(id);
    return id;
  }
);

// Async Thunks pour les contacts
export const fetchContacts = createAsyncThunk(
  'admin/fetchContacts',
  async () => {
    const data = await adminContactsApi.getAllContacts();
    return Array.isArray(data.contacts) ? data.contacts : [];
  }
);

export const markContactAsProcessed = createAsyncThunk(
  'admin/markContactAsProcessed',
  async (id: string) => {
    await adminContactsApi.markContactAsProcessed(id);
    return id;
  }
);

export const deleteContact = createAsyncThunk(
  'admin/deleteContact',
  async (id: string) => {
    await adminContactsApi.deleteContact(id);
    return id;
  }
);

// Async Thunks pour la newsletter
export const fetchSubscribers = createAsyncThunk(
  'admin/fetchSubscribers',
  async () => {
    const data = await adminNewsletterApi.getAllSubscribers();
    return Array.isArray(data.subscribers) ? data.subscribers : [];
  }
);

export const deleteSubscriber = createAsyncThunk(
  'admin/deleteSubscriber',
  async (id: string) => {
    await adminNewsletterApi.deleteSubscriber(id);
    return id;
  }
);

// Async Thunks pour les demandes de voyage
export const fetchTravelRequests = createAsyncThunk(
  'admin/fetchTravelRequests',
  async () => {
    const data = await adminTravelRequestsApi.getAllTravelRequests();
    return Array.isArray(data.travelRequests) ? data.travelRequests : [];
  }
);

export const markTravelRequestAsProcessed = createAsyncThunk(
  'admin/markTravelRequestAsProcessed',
  async (id: string) => {
    await adminTravelRequestsApi.markTravelRequestAsProcessed(id);
    return id;
  }
);

export const deleteTravelRequest = createAsyncThunk(
  'admin/deleteTravelRequest',
  async (id: string) => {
    await adminTravelRequestsApi.deleteTravelRequest(id);
    return id;
  }
);

// Slice Redux
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<string | null>) => {
      state.selectedItem = action.payload;
    },
    clearErrors: (state) => {
      state.testimonialsError = null;
      state.contactsError = null;
      state.newsletterError = null;
      state.travelRequestsError = null;
    },
  },
  extraReducers: (builder) => {
    // Testimonials
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.testimonialsLoading = true;
        state.testimonialsError = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonialsError = action.error.message || 'Erreur lors du chargement';
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
      })

    // Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.contactsLoading = true;
        state.contactsError = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contactsLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contactsLoading = false;
        state.contactsError = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(markContactAsProcessed.fulfilled, (state, action) => {
        const contact = state.contacts.find(c => c.id === action.payload);
        if (contact) {
          contact.status = 'processed';
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      })

    // Newsletter
      .addCase(fetchSubscribers.pending, (state) => {
        state.newsletterLoading = true;
        state.newsletterError = null;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.newsletterLoading = false;
        state.subscribers = action.payload;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.newsletterLoading = false;
        state.newsletterError = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.subscribers = state.subscribers.filter(s => s.id !== action.payload);
      })

    // Travel Requests
      .addCase(fetchTravelRequests.pending, (state) => {
        state.travelRequestsLoading = true;
        state.travelRequestsError = null;
      })
      .addCase(fetchTravelRequests.fulfilled, (state, action) => {
        state.travelRequestsLoading = false;
        state.travelRequests = action.payload;
      })
      .addCase(fetchTravelRequests.rejected, (state, action) => {
        state.travelRequestsLoading = false;
        state.travelRequestsError = action.error.message || 'Erreur lors du chargement';
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

export const { setSelectedItem, clearErrors } = adminSlice.actions;
export default adminSlice.reducer;