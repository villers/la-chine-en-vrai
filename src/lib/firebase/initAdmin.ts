import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';

export async function createAdminUser() {
  try {
    const email = 'admin@chine-en-vrai.com';
    const password = 'admin123';
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Utilisateur admin créé:', userCredential.user.email);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ L\'utilisateur admin existe déjà');
      return null;
    }
    console.error('❌ Erreur lors de la création de l\'admin:', error);
    throw error;
  }
}