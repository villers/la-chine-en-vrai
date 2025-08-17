import Image from 'next/image';

interface TestimonialProps {
  name: string;
  text: string;
  location: string;
  avatar?: string;
  rating?: number;
}

export default function Testimonial({ name, text, location, avatar, rating = 5 }: TestimonialProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <blockquote className="text-gray-700 mb-4 italic">
        "{text}"
      </blockquote>
      
      <div className="flex items-center">
        {avatar && (
          <div className="relative w-12 h-12 mr-4">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{location}</div>
        </div>
      </div>
    </div>
  );
}