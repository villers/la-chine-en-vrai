import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface BlogPostPageProps {
  params: { slug: string };
}

async function getBlogPost(slug: string) {
  try {
    const { blogApi } = await import('@/lib/api');
    return await blogApi.getPostBySlug(slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getAllBlogPosts() {
  try {
    const { blogApi } = await import('@/lib/api');
    return await blogApi.getPosts({ limit: 20 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getAllBlogPosts()
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter((p: any) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
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
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>,
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

      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Articles similaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <article key={relatedPost.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {relatedPost.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      {relatedPost.category}
                    </span>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">
                      <Link href={`/blog/${relatedPost.slug || relatedPost.id}`} className="hover:text-red-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                    
                    <Link 
                      href={`/blog/${relatedPost.slug || relatedPost.id}`}
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
      )}
    </div>
  );
}