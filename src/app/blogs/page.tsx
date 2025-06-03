"use client"
// pages/blog/index.tsx


import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Image from 'next/image';
const blogs = [
  { id: 1, imageUrl : "https://picsum.photos/200/300/?blur", date : "18 November,2024", title: "Kashmir: Heaven on Earth", content: "Kashmir, often referred to as Heaven on Earth, is a picturesque paradise offering mesmerizing landscapes, rich culture, and serene beauty." },
  { id: 2, imageUrl : "https://picsum.photos/id/870/200/300?grayscale&blur=2", date : "18 November,2024", title: "Lonavala: Escape to Nature", content: "Lonavala, nestled in the Western Ghats, is the perfect getaway for nature lovers and adventure seekers alike. Known for its cool climate, lush green landscapes, and scenic views, Lonavala is a favorite among those looking to unwind. " },
  { id: 3, imageUrl : "https://picsum.photos/seed/picsum/200/300", date : "18 November,2024", title: "Kerala: God's Own Country", content: "Kerala, famously known as God's Own Country, is a tropical paradise that offers a perfect blend of nature, culture, and relaxation. From the tranquil backwaters of Alleppey to the golden beaches of Kovalam and the misty hills of Munnar, Kerala is a dream destination." },
  { id: 4, imageUrl : "https://picsum.photos/id/870/200/300?grayscale&blur=2", date : "18 November,2024", title: "Meghalaya: The Abode of Clouds", content: "Meghalaya, aptly called The Abode of Clouds, is a serene paradise in Northeast India, known for its misty landscapes, cascading waterfalls, and lush greenery." },
  { id: 5, imageUrl : "https://picsum.photos/seed/picsum/200/300", date : "18 November,2024", title: "Coorg: Scotland of India", content: "Coorg, often called the Scotland of India, is a tranquil hill station nestled in the Western Ghats of Karnataka. Known for its lush coffee plantations, misty hills, and scenic landscapes, Coorg is perfect for nature lovers and adventure enthusiasts alike" },
  { id: 6, imageUrl : "https://picsum.photos/200/300/?blur", date : "18 November,2024", title: "Sikkim: A Himalayan Gem", content: "Sikkim, a hidden gem in the Eastern Himalayas, offers unparalleled natural beauty and cultural richness. From the towering Kanchenjunga, the third-highest mountain in the world, to the serene lakes like Tsomgo and Yumthang, Sikkim is a paradise for nature lovers and adventure seekers." }
]

const BlogList = () => {
  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Blog List</h1> */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <Image 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-48 object-cover"
              width={500}  // Specify width
              height={300} // Specify height
            />
            <div className="p-6">
            <h6 className='text-md text-gray-600 mb-4'>{blog.date}</h6>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.content.substring(0, 150)}...</p>
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default BlogList
