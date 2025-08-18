import apiClient from './client';

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface TravelRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  destinations: string[];
  duration: string;
  budget: string;
  travelers: number;
  travelStyle: string;
  departureDate?: string;
  interests: string[];
  accommodationType: string;
  hasSpecialRequests: boolean;
  specialRequests?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const contactApi = {
  // Envoyer un message de contact
  sendMessage: async (contactData: ContactData): Promise<{ id: string; message: string }> => {
    const response = await apiClient.post<ContactResponse>('/api/contact', contactData);
    return {
      id: response.data.id!,
      message: response.data.message
    };
  },

  // Envoyer une demande de voyage
  sendTravelRequest: async (travelData: TravelRequestData): Promise<{ id: string; message: string }> => {
    const response = await apiClient.post<ContactResponse>('/api/travel-form', travelData);
    return {
      id: response.data.id!,
      message: response.data.message
    };
  }
};