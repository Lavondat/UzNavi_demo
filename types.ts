
export enum BudgetTier {
  Bronze = 'Bronze ($300–400)',
  Silver = 'Silver ($400–700)',
  Gold = 'Gold ($700–1100)'
}

export enum TripType {
  Solo = 'Solo',
  Couple = 'Couple',
  Family = 'Family',
  Group = 'Group'
}

export enum Pace {
  Relaxed = 'Relaxed',
  Moderate = 'Moderate',
  Active = 'Active'
}

export interface Interest {
  id: string;
  label: string;
  icon: string;
}

export interface UserPreferences {
  interests: string[];
  budgetTier: BudgetTier;
  tripType: TripType;
  days: number;
  pace: Pace;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Place {
  id: string;
  name: string;
  city: string;
  category: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
  price_range: string;
  phone: string;
  opening_hours: string;
  tags: string[];
  reviews: Review[];
  averageRating: number;
}

export interface ItineraryDay {
  day: number;
  stops: Place[];
  summary: string;
}

export interface Trip {
  id: string;
  userId: string;
  preferences: UserPreferences;
  days: ItineraryDay[];
  totalEstimatedCost: number;
  createdAt: string;
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  languages: string[];
  hourlyRate: number;
  experienceYears: number;
  specialties: string[];
  contact: string;
  reviews: Review[];
  averageRating: number;
}
