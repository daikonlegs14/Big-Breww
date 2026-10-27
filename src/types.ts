export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type TemperatureType = 'iced' | 'hot' | 'both';
export type CaffeineLevel = 'high' | 'medium' | 'low' | 'decaf';

export interface Drink {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tastingNotes: string[];
  sizes: string[];
  temperature: TemperatureType;
  image: string;
  isSignature: boolean;
  isAvailable: boolean;
  caffeineLevel: CaffeineLevel;
  createdAt: string;
}

export interface DrinkFormData {
  name: string;
  category: string;
  price: number | string;
  description: string;
  tastingNotes: string;
  sizes: string[];
  temperature: TemperatureType;
  image: string;
  isSignature: boolean;
  isAvailable: boolean;
  caffeineLevel: CaffeineLevel;
}

export interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  description?: string;
  tastingNotes?: string;
  image?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
