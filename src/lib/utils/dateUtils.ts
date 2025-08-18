/**
 * Simple date formatting utilities
 */

export function formatDate(date: any, locale: string = 'fr-FR'): string {
  if (!date) return 'Date non disponible';
  
  try {
    return new Date(date).toLocaleDateString(locale);
  } catch {
    return 'Date non disponible';
  }
}

export function formatDateTime(date: any, locale: string = 'fr-FR'): string {
  if (!date) return 'Date non disponible';
  
  try {
    return new Date(date).toLocaleString(locale);
  } catch {
    return 'Date non disponible';
  }
}