import type { FormData } from '../types';

const STORAGE_KEY = 'gozareshyar_form_data';

export function saveFormData(data: FormData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
}

export function loadFormData(): FormData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load form data:', error);
    return null;
  }
}

export function clearFormData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear form data:', error);
  }
}
