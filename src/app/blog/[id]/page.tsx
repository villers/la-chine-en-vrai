import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/lib/data/blogPosts';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image && (
            <div className="relative h-64 md:h-96 w-full bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Image: {post.title}
              </div>
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
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <span>Par {post.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="prose prose-lg prose-gray max-w-none">
              <div 
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Articles similaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {relatedPost.image && (
                    <div className="relative h-48 w-full bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        Image: {relatedPost.title}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      {relatedPost.category}
                    </span>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-red-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                    
                    <Link 
                      href={`/blog/${relatedPost.id}`}
                      className="text-red-600 font-medium hover:text-red-700 transition-colors text-sm"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}