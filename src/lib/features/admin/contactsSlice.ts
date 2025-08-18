import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '@/lib/store/hooks';
import { adminContactsApi } from '@/lib/api/admin';

// Types pour les contacts
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'processed';
  createdAt: any;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchContacts = createAsyncThunk(
  'adminContacts/fetchContacts',
  async () => {
    const data = await adminContactsApi.getAllContacts();
    return Array.isArray(data.contacts) ? data.contacts : [];
  }
);

export const markContactAsProcessed = createAsyncThunk(
  'adminContacts/markContactAsProcessed',
  async (id: string) => {
    await adminContactsApi.markContactAsProcessed(id);
    return id;
  }
);

export const deleteContact = createAsyncThunk(
  'adminContacts/deleteContact',
  async (id: string) => {
    await adminContactsApi.deleteContact(id);
    return id;
  }
);

// Slice
const contactsSlice = createSlice({
  name: 'adminContacts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement';
      })
      .addCase(markContactAsProcessed.fulfilled, (state, action) => {
        const contact = state.contacts.find(c => c.id === action.payload);
        if (contact) {
          contact.status = 'processed';
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      });
  },
});

export const { clearError } = contactsSlice.actions;

// Hooks personnalisés avec useAppSelector
export const useContacts = () => useAppSelector((state) => state.admin.contacts.contacts);
export const useContactsLoading = () => useAppSelector((state) => state.admin.contacts.loading);
export const useContactsError = () => useAppSelector((state) => state.admin.contacts.error);
export const useNewContacts = () => useAppSelector((state) => 
  state.admin.contacts.contacts.filter((c: Contact) => c.status === 'new'));
export const useProcessedContacts = () => useAppSelector((state) => 
  state.admin.contacts.contacts.filter((c: Contact) => c.status === 'processed'));

export default contactsSlice.reducer;