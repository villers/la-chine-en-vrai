import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  where 
} from 'firebase/firestore';
import { db } from './config';
import { convertFirebaseDoc, ensureFirebaseInitialized } from './utils';

// Types pour l'admin blog
export interface AdminBlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt?: any;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
  slug?: string;
  isPublished?: boolean;
  views?: number;
  createdAt?: any;
  updatedAt?: any;
}

const COLLECTION_NAME = 'blog';

/**
 * Service Firebase pour l'administration des articles de blog
 * Contient toutes les opérations CRUD avec permissions admin
 */
export class BlogAdminService {
  
  /**
   * Récupère tous les articles (publiés et non publiés)
   */
  static async getAllPosts(includeUnpublished = true): Promise<AdminBlogPost[]> {
    ensureFirebaseInitialized();

    try {
      const postsRef = collection(db, COLLECTION_NAME);
      let q = query(postsRef, orderBy('createdAt', 'desc'));
      
      if (!includeUnpublished) {
        q = query(postsRef, where('isPublished', '==', true), orderBy('createdAt', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => convertFirebaseDoc(doc));
    } catch (error) {
      console.error('Erreur lors de la récupération des articles admin:', error);
      throw new Error('Impossible de récupérer les articles');
    }
  }

  /**
   * Récupère un article par ID (admin only)
   */
  static async getPostById(id: string): Promise<AdminBlogPost> {
    try {
      const postRef = doc(db, COLLECTION_NAME, id);
      const postSnap = await getDoc(postRef);
      
      if (!postSnap.exists()) {
        throw new Error('Article non trouvé');
      }
      
      return convertFirebaseDoc(postSnap);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
      throw error;
    }
  }

  /**
   * Crée un nouvel article
   */
  static async createPost(postData: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminBlogPost> {
    try {
      // Générer le slug depuis le titre
      const slug = this.generateSlug(postData.title);
      
      const newPost = {
        ...postData,
        slug,
        views: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: postData.isPublished ? serverTimestamp() : null,
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), newPost);
      
      // Retourner l'article créé avec son ID
      return {
        ...newPost,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: postData.isPublished ? new Date() : null,
      };
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw new Error('Impossible de créer l\'article');
    }
  }

  /**
   * Met à jour un article existant
   */
  static async updatePost(id: string, updates: Partial<AdminBlogPost>): Promise<void> {
    try {
      const postRef = doc(db, COLLECTION_NAME, id);
      
      // Vérifier si l'article existe
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) {
        throw new Error('Article non trouvé');
      }
      
      const updateData: any = {
        ...updates,
        updatedAt: serverTimestamp(),
      };

      // Si on publie pour la première fois, ajouter publishedAt
      if (updates.isPublished && !postSnap.data().isPublished) {
        updateData.publishedAt = serverTimestamp();
      }
      
      // Si on dépublie, supprimer publishedAt
      if (updates.isPublished === false) {
        updateData.publishedAt = null;
      }

      // Régénérer le slug si le titre a changé
      if (updates.title) {
        updateData.slug = this.generateSlug(updates.title);
      }

      await updateDoc(postRef, updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      throw error;
    }
  }

  /**
   * Supprime un article
   */
  static async deletePost(id: string): Promise<void> {
    try {
      const postRef = doc(db, COLLECTION_NAME, id);
      
      // Vérifier si l'article existe
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) {
        throw new Error('Article non trouvé');
      }
      
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      throw error;
    }
  }

  /**
   * Publie ou dépublie un article
   */
  static async togglePublishStatus(id: string, isPublished: boolean): Promise<void> {
    try {
      await this.updatePost(id, { 
        isPublished,
        publishedAt: isPublished ? serverTimestamp() : null
      });
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      throw error;
    }
  }

  /**
   * Obtient les statistiques des articles
   */
  static async getPostsStats(): Promise<{ total: number; published: number; unpublished: number }> {
    try {
      const posts = await this.getAllPosts(true);
      const published = posts.filter(post => post.isPublished).length;
      const unpublished = posts.filter(post => !post.isPublished).length;
      
      return {
        total: posts.length,
        published,
        unpublished
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  /**
   * Génère un slug à partir du titre
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/--+/g, '-') // Supprimer les tirets doubles
      .trim();
  }
}

// Export des méthodes individuelles pour compatibilité
export const {
  getAllPosts: getAllBlogPostsAdmin,
  getPostById: getBlogPostByIdAdmin,
  createPost: createBlogPostAdmin,
  updatePost: updateBlogPostAdmin,
  deletePost: deleteBlogPostAdmin,
  togglePublishStatus: toggleBlogPostPublishStatus,
  getPostsStats: getBlogPostsStatsAdmin
} = BlogAdminService;