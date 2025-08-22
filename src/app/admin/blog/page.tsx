'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppDispatch } from '@/lib/store/hooks';
import { 
  fetchBlogPostsAdmin, 
  deleteBlogPost,
  updateBlogPost,
  useAdminBlogPosts,
  useAdminBlogLoading,
  useAdminBlogError,
  usePublishedBlogPosts,
  useUnpublishedBlogPosts
} from '@/lib/features/admin/blogSlice';
import { formatDate } from '@/lib/utils/dateUtils';
import Link from 'next/link';

export default function AdminBlog() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const posts = useAdminBlogPosts();
  const loadingData = useAdminBlogLoading();
  const error = useAdminBlogError();
  const publishedPosts = usePublishedBlogPosts();
  const unpublishedPosts = useUnpublishedBlogPosts();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchBlogPostsAdmin({ includeUnpublished: true }));
    }
  }, [isAdmin, dispatch]);

  const togglePublished = async (id: string, currentStatus: boolean) => {
    await dispatch(updateBlogPost({ id, updates: { isPublished: !currentStatus } }));
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    await dispatch(deleteBlogPost(id));
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-red-600 hover:text-red-500">
                ← Retour au dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestion des articles
              </h1>
            </div>
            <Link
              href="/admin/blog/new"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Nouvel article
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Total des articles</div>
              <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Publiés</div>
              <div className="text-2xl font-bold text-green-600">
                {publishedPosts.length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Brouillons</div>
              <div className="text-2xl font-bold text-yellow-600">
                {unpublishedPosts.length}
              </div>
            </div>
          </div>

          {/* Liste des articles */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {posts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <li key={post.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">
                              {post.title}
                            </h3>
                            <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {post.category}
                            </span>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              post.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.isPublished ? 'Publié' : 'Brouillon'}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>Par {post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readingTime}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(post.createdAt)}</span>
                          {post.views && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{post.views} vues</span>
                            </>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded text-sm font-medium"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => togglePublished(post.id!, post.isPublished || false)}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            post.isPublished
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {post.isPublished ? 'Dépublier' : 'Publier'}
                        </button>
                        <Link
                          href={`/blog/${post.slug || post.id}${!post.isPublished ? '?preview=true' : ''}`}
                          target="_blank"
                          className="px-3 py-1 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded text-sm font-medium"
                        >
                          {post.isPublished ? 'Voir' : 'Prévisualiser'}
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id!)}
                          className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded text-sm font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun article trouvé</p>
                <Link
                  href="/admin/blog/new"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Créer le premier article
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}