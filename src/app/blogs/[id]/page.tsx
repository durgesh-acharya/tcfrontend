'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Image from 'next/image';
// Type definitions
interface Blog {
  id: number;
  title: string;
  content: string;
  date?: string;
  imageUrl?: string;
}

// Mock blog data
const blogs: Blog[] = [
  {
    id: 1,
    title: 'My First Blog',
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32,',
    date: '2025-04-01',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    title: 'Next.js Tips and Tricks',
    content: 'This is the content of the Next.js tips blog.',
    date: '2025-04-15',
    imageUrl: 'https://picsum.photos/200/300/?blur',
  },
  {
    id: 3,
    title: 'Building with Tailwind CSS',
    content: 'This is the content of the Tailwind CSS blog.',
    date: '2025-05-01',
    imageUrl: 'https://picsum.photos/200/300/?blur',
  },
];

export default function BlogPage() {
  const params = useParams();
  const id = params?.id;

  const blog = useMemo(
    () => blogs.find((b) => b.id.toString() === id),
    [id]
  );

  if (!blog) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center text-red-600">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      
     {/* Blog Image */}
      {blog.imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg shadow-md overflow-hidden">
          <Image
           src={blog.imageUrl}
           alt={blog.title}
           fill // This makes the image fill the container
           className="object-cover"
           priority // Optional: preload if image is above the fold
           />
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
        {blog.title}
      </h1>

      {/* Date */}
      {blog.date && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(blog.date).toDateString()}
        </p>
      )}

      {/* Content */}
      <div className="prose prose-lg text-justify max-w-none text-gray-800">
        {blog.content}
      </div>
    </div>
  );
}
