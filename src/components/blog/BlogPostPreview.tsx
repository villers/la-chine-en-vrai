'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { blogApi } from '@/lib/api/blog';
import { BlogPost } from '@/lib/features/blog/blogSlice';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface BlogPostPreviewProps {
  slug: string;
}

export default function BlogPostPreview({ slug }: BlogPostPreviewProps) {
  const { isAdmin, loading: authLoading } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!authLoading && isAdmin) {
          const postData = await blogApi.getPostBySlug(slug, true);
          setPost(postData);
        } else if (!authLoading && !isAdmin) {
          setError('Accès non autorisé - Vous devez être connecté en tant qu\'administrateur');
        }
      } catch (err) {
        console.error('Error loading preview:', err);
        setError(`Erreur lors du chargement de la prévisualisation: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadPost();
    }
  }, [slug, isAdmin, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/admin/login"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link
            href="/admin/blog"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Retour à la gestion des articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bandeau de prévisualisation */}
      {!post.isPublished && (
        <div className="bg-yellow-100 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-800 font-medium">
                  🔍 Mode prévisualisation
                </span>
                <span className="text-yellow-600">
                  Cet article n'est pas encore publié et n'est visible que par les administrateurs.
                </span>
              </div>
              <Link
                href="/admin/blog"
                className="text-yellow-800 hover:text-yellow-900 font-medium"
              >
                Retour à l'admin
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image && (
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="mb-6">
              <Link 
                href="/blog"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                ← Retour au blog
              </Link>
            </div>

            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readingTime}</span>
                {!post.isPublished && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Brouillon
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <span>Par {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.publishedAt ? new Date(post.publishedAt.seconds ? post.publishedAt.seconds * 1000 : post.publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Date non disponible'}</span>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-red-600 prose-strong:text-gray-900">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-700">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-700">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                  a: ({ href, children }) => <a href={href} className="text-red-600 hover:text-red-700 underline">{children}</a>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-red-200 pl-4 py-2 mb-4 bg-red-50 text-gray-700 italic">{children}</blockquote>,
                  code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map((tag: string) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Envie de vivre cette expérience ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Contactez nos experts pour créer votre voyage sur mesure en Chine
                </p>
                <Link
                  href="/custom-travel"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Créer mon voyage
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
}