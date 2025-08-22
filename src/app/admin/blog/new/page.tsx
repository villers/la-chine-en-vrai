'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppDispatch } from '@/lib/store/hooks';
import { createBlogPost } from '@/lib/features/admin/blogSlice';
import Link from 'next/link';
import RichTextEditorWrapper from '@/components/admin/RichTextEditorWrapper';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewBlogPost() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        readingTime: formData.readingTime || '5 min',
        isPublished: publish
      };

      await dispatch(createBlogPost(postData)).unwrap();
      
      router.push('/admin/blog');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de l\'article');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return <div>Accès non autorisé</div>;
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
                Nouvel article
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          
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
              placeholder="Résumé de l'article (sera affiché dans la liste des articles)"
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
                placeholder="Rédigez le contenu de votre article..."
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
              <p className="mt-1 text-sm text-gray-500">
                Exemple: voyage, chine, culture
              </p>
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
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Sauvegarde...' : 'Sauvegarder comme brouillon'}
              </button>
              
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Publication...' : 'Publier'}
              </button>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}