import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  link?: string;
  ctaText?: string;
  className?: string;
}

export default function Card({ title, description, image, link, ctaText, className }: CardProps) {
  const CardContent = () => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group ${className}`}>
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        {ctaText && (
          <div className="flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors">
            <span>{ctaText}</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}