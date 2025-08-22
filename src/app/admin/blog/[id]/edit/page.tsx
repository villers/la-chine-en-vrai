'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppDispatch } from '@/lib/store/hooks';
import { fetchBlogPostById, updateBlogPost, useAdminBlogCurrentPost, useAdminBlogLoading } from '@/lib/features/admin/blogSlice';
import Link from 'next/link';
import RichTextEditorWrapper from '@/components/admin/RichTextEditorWrapper';
import ImageUpload from '@/components/admin/ImageUpload';

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPost({ params }: PageParams) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const currentPost = useAdminBlogCurrentPost();
  const loading = useAdminBlogLoading();
  
  const [saving, setSaving] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Conseils pratiques',
    tags: '',
    readingTime: '',
    image: '',
    isPublished: false
  });

  const categories = [
    'Conseils pratiques',
    'Gastronomie', 
    'Culture',
    'Voyage',
    'Témoignage'
  ];

  // Récupérer l'ID de l'article depuis les params async
  useEffect(() => {
    const getArticleId = async () => {
      const resolvedParams = await params;
      setArticleId(resolvedParams.id);
    };
    getArticleId();
  }, [params]);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchBlogPostById(articleId));
    }
  }, [dispatch, articleId]);

  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title || '',
        excerpt: currentPost.excerpt || '',
        content: currentPost.content || '',
        author: currentPost.author || '',
        category: currentPost.category || 'Conseils pratiques',
        tags: currentPost.tags ? currentPost.tags.join(', ') : '',
        readingTime: currentPost.readingTime || '',
        image: currentPost.image || '',
        isPublished: currentPost.isPublished || false
      });
    }
  }, [currentPost]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSaving(true);

    try {
      const updateData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        readingTime: formData.readingTime || '5 min',
        isPublished: publish !== undefined ? publish : formData.isPublished
      };

      if (!articleId) return;
      await dispatch(updateBlogPost({ id: articleId, updates: updateData })).unwrap();
      
      router.push('/admin/blog');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour de l\'article');
    } finally {
      setSaving(false);
    }
  };

  if (!isAdmin) {
    return <div>Accès non autorisé</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Article non trouvé</h2>
          <Link href="/admin/blog" className="text-red-600 hover:text-red-500">
            ← Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/blog" className="text-red-600 hover:text-red-500">
                ← Retour aux articles
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Modifier l'article
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                currentPost.isPublished 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentPost.isPublished ? 'Publié' : 'Brouillon'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          
          {/* Titre */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Titre de l'article"
            />
          </div>

          {/* Résumé */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Résumé *
            </label>
            <textarea
              name="excerpt"
              id="excerpt"
              required
              rows={3}
              value={formData.excerpt}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Résumé de l'article"
            />
          </div>

          {/* Contenu */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Contenu *
            </label>
            <div className="mt-1">
              <RichTextEditorWrapper
                content={formData.content}
                onChange={handleContentChange}
                placeholder="Modifiez le contenu de votre article..."
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Utilisez la barre d'outils pour formater votre contenu
            </p>
          </div>

          {/* Métadonnées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Auteur */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Auteur *
              </label>
              <input
                type="text"
                name="author"
                id="author"
                required
                value={formData.author}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Nom de l'auteur"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Séparez les tags par des virgules"
              />
            </div>

            {/* Temps de lecture */}
            <div>
              <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700">
                Temps de lecture
              </label>
              <input
                type="text"
                name="readingTime"
                id="readingTime"
                value={formData.readingTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="ex: 5 min"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image de l'article
            </label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              placeholder="URL de l'image de l'article"
              folder="blog"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Link
              href="/admin/blog"
              className="text-gray-600 hover:text-gray-800"
            >
              Annuler
            </Link>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              
              {!currentPost.isPublished && (
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {saving ? 'Publication...' : 'Publier'}
                </button>
              )}
              
              {currentPost.isPublished && (
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  disabled={saving}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                >
                  {saving ? 'Dépublication...' : 'Dépublier'}
                </button>
              )}
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}