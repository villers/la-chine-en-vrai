import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
  isPublished: boolean;
  createdAt?: any;
  updatedAt?: any;
  slug: string;
  views?: number;
}

export interface CreateBlogPostData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
  slug: string;
}

const COLLECTION_NAME = 'blog';

/**
 * Crée un nouvel article de blog
 */
export async function createBlogPost(data: CreateBlogPostData): Promise<string> {
  try {
    const blogPost: Omit<BlogPost, 'id'> = {
      ...data,
      isPublished: false,
      views: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), blogPost);
    console.log('Article de blog créé avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    throw error;
  }
}

/**
 * Crée un article de blog déjà publié (pour les données de démo)
 */
export async function createPublishedBlogPost(data: CreateBlogPostData): Promise<string> {
  try {
    const blogPost: Omit<BlogPost, 'id'> = {
      ...data,
      isPublished: true,
      views: Math.floor(Math.random() * 1000) + 100, // Vues aléatoires pour la démo
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), blogPost);
    console.log('Article de blog publié créé avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article publié:', error);
    throw error;
  }
}

/**
 * Récupère tous les articles publiés
 */
export async function getPublishedBlogPosts(limitCount: number = 10): Promise<BlogPost[]> {
  try {
    const blogPostsRef = collection(db, COLLECTION_NAME);
    const q = query(
      blogPostsRef,
      where('isPublished', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as BlogPost[];
  } catch (error) {
    console.error('Erreur lors de la récupération des articles publiés:', error);
    throw error;
  }
}

/**
 * Récupère les articles par catégorie
 */
export async function getBlogPostsByCategory(category: string, limitCount: number = 10): Promise<BlogPost[]> {
  try {
    const blogPostsRef = collection(db, COLLECTION_NAME);
    const q = query(
      blogPostsRef,
      where('isPublished', '==', true),
      where('category', '==', category),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as BlogPost[];
  } catch (error) {
    console.error('Erreur lors de la récupération des articles par catégorie:', error);
    throw error;
  }
}

/**
 * Récupère un article par son slug
 */
export async function getBlogPostBySlug(slug: string, allowUnpublished = false): Promise<BlogPost | null> {
  try {
    const blogPostsRef = collection(db, COLLECTION_NAME);
    let q;
    
    if (allowUnpublished) {
      // Mode admin : récupère l'article même s'il n'est pas publié
      q = query(
        blogPostsRef,
        where('slug', '==', slug)
      );
    } else {
      // Mode public : seulement les articles publiés
      q = query(
        blogPostsRef,
        where('slug', '==', slug),
        where('isPublished', '==', true)
      );
    }

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    
    // Incrémenter les vues
    await updateDoc(doc.ref, {
      views: (doc.data().views || 0) + 1
    });

    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      views: (doc.data().views || 0) + 1
    } as BlogPost;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article par slug:', error);
    throw error;
  }
}

/**
 * Récupère tous les articles (pour l'admin)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPostsRef = collection(db, COLLECTION_NAME);
    const q = query(
      blogPostsRef,
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as BlogPost[];
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les articles:', error);
    throw error;
  }
}

/**
 * Met à jour un article
 */
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
  try {
    const blogPostRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(blogPostRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    console.log('Article mis à jour:', id);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    throw error;
  }
}

/**
 * Publie un article
 */
export async function publishBlogPost(id: string): Promise<void> {
  try {
    const blogPostRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(blogPostRef, {
      isPublished: true,
      updatedAt: serverTimestamp(),
    });
    console.log('Article publié:', id);
  } catch (error) {
    console.error('Erreur lors de la publication de l\'article:', error);
    throw error;
  }
}

/**
 * Dépublie un article
 */
export async function unpublishBlogPost(id: string): Promise<void> {
  try {
    const blogPostRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(blogPostRef, {
      isPublished: false,
      updatedAt: serverTimestamp(),
    });
    console.log('Article dépublié:', id);
  } catch (error) {
    console.error('Erreur lors de la dépublication de l\'article:', error);
    throw error;
  }
}

/**
 * Supprime un article
 */
export async function deleteBlogPost(id: string): Promise<void> {
  try {
    const blogPostRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(blogPostRef);
    console.log('Article supprimé:', id);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    throw error;
  }
}

/**
 * Récupère les statistiques des articles
 */
export async function getBlogStats(): Promise<{
  totalPosts: number;
  publishedPosts: number;
  totalViews: number;
  categories: { [key: string]: number };
}> {
  try {
    const blogPostsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(blogPostsRef);
    
    let totalPosts = 0;
    let publishedPosts = 0;
    let totalViews = 0;
    const categories: { [key: string]: number } = {};
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      totalPosts++;
      
      if (data.isPublished) {
        publishedPosts++;
      }
      
      totalViews += data.views || 0;
      
      if (data.category) {
        categories[data.category] = (categories[data.category] || 0) + 1;
      }
    });
    
    return { totalPosts, publishedPosts, totalViews, categories };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}