import { Drink, DrinkFormData, User } from './types';

const STORAGE_TOKEN_KEY = 'bigbrew_auth_token';
const STORAGE_USER_KEY = 'bigbrew_auth_user';

export function getStoredAuth(): { token: string | null; user: User | null } {
  try {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);
    const userJson = localStorage.getItem(STORAGE_USER_KEY);
    const user = userJson ? JSON.parse(userJson) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function saveStoredAuth(token: string, user: User) {
  localStorage.setItem(STORAGE_TOKEN_KEY, token);
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  localStorage.removeItem(STORAGE_USER_KEY);
}

function getHeaders(customHeaders: Record<string, string> = {}) {
  const { token } = getStoredAuth();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// --- Drinks API ---

export async function fetchDrinks(): Promise<Drink[]> {
  const res = await fetch('/api/drinks');
  if (!res.ok) {
    throw new Error('Failed to load live drink menu.');
  }
  const data = await res.json();
  return data.drinks || [];
}

export async function createDrink(payload: Partial<Drink>): Promise<Drink> {
  const res = await fetch('/api/drinks', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create drink.');
  }
  return data.drink;
}

export async function updateDrink(id: string, payload: Partial<Drink>): Promise<Drink> {
  const res = await fetch(`/api/drinks/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update drink.');
  }
  return data.drink;
}

export async function deleteDrink(id: string): Promise<void> {
  const res = await fetch(`/api/drinks/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete drink.');
  }
}

export async function resetDrinksMenu(): Promise<Drink[]> {
  const res = await fetch('/api/drinks/reset', {
    method: 'POST',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to reset drinks menu.');
  }
  return data.drinks;
}

// --- Auth API ---

export async function loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed.');
  }
  saveStoredAuth(data.token, data.user);
  return data;
}

export async function registerUser(name: string, email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Registration failed.');
  }
  saveStoredAuth(data.token, data.user);
  return data;
}

export async function fetchCurrentUser(): Promise<User | null> {
  const { token } = getStoredAuth();
  if (!token) return null;
  try {
    const res = await fetch('/api/auth/me', {
      headers: getHeaders(),
    });
    if (!res.ok) {
      clearStoredAuth();
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}
