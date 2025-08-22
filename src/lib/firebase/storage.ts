import { storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Types pour l'upload d'images
export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Upload une image vers Firebase Storage
 */
export async function uploadImage(
  file: File, 
  folder: string = 'blog',
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  // Validation du fichier
  if (!file.type.startsWith('image/')) {
    throw new Error('Le fichier doit être une image');
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    throw new Error('Le fichier est trop volumineux (max 5MB)');
  }

  // Générer un nom de fichier unique
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `${folder}/${fileName}`;

  // Créer la référence dans Storage
  const storageRef = ref(storage, filePath);

  try {
    // Upload du fichier
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtenir l'URL de téléchargement
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      path: filePath,
      fileName: fileName
    };
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    throw new Error('Erreur lors de l\'upload de l\'image');
  }
}

/**
 * Supprime une image de Firebase Storage
 */
export async function deleteImage(imagePath: string): Promise<void> {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw new Error('Erreur lors de la suppression de l\'image');
  }
}

/**
 * Extrait le chemin de l'image depuis une URL Firebase Storage
 */
export function extractImagePathFromUrl(url: string): string | null {
  try {
    // Pattern pour extraire le chemin des URLs Firebase Storage
    const match = url.match(/\/o\/(.+?)\?/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Valide si une URL est une URL Firebase Storage
 */
export function isFirebaseStorageUrl(url: string): boolean {
  return url.includes('firebasestorage.googleapis.com') || 
         url.includes('localhost:9199'); // Pour l'émulateur
}