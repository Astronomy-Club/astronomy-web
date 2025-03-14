'use client'

import React, { useEffect, useState } from 'react';
import blogs_data from './data';
import BlogCard from '@/app/Components/BlogCard';
import Image from 'next/image';
import { motion } from "framer-motion";
import star from '../../../../public/star.png';

const BlogPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <>
      {/* Custom Star Cursor */}
      {!isMobile && (
        <div className='fixed top-0 left-0 pointer-events-none' style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`, zIndex: 1000 }}>
          <Image src={star} alt="Star Cursor" width={30} height={30} />
        </div>
      )}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-6 mt-20 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Our Blogs
      </motion.h1>
      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48 flex flex-col items-center">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {blogs_data.map((blog, index) => (
            <motion.div
              key={blog.title}
              className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <Image src={blog.img} alt={blog.title} width={400} height={250} className="w-full h-60 object-cover" />
                <div className="p-4 text-white text-center">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
