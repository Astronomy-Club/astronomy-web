"use client"
import '../../globals.css'
import React, { useState, useEffect } from 'react'
import { Roboto } from 'next/font/google'
import Image from 'next/image';
import Hero from '../../../../public/Hero.png'
import star from '../../../../public/star.png'
import ParticleEffect from '@/app/Animations/ParticleEffect';
import { motion } from "framer-motion"
import Link from 'next/link'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const heroVariants = {
  visible: {
    x: [-30, 30, -30],
    y: [-30, 30, -30],
    transition: {
      repeat: Infinity,
      delay: 0.1,
      duration: 5,
    }
  }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const Home = () => {
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
      <div className='min-h-screen mt-[50px] bg-black flex flex-col md:flex-row justify-between items-center px-6 md:px-12'>
        <div className='flex flex-col text-center md:text-left md:w-1/2 mt-10 md:mt-20 space-y-4'>
          <h1 className='text-white text-3xl md:text-5xl font-bold leading-tight'>
            <span className={roboto.className}>Step into the Wonders of the Astronomy Club!</span>
          </h1>
          <p className='text-white text-sm md:text-lg leading-relaxed'>
            <span className={roboto.className}>Unveiling the Mysteries of the Universe, We are the <span className='text-gradient font-bold'>Astronomy</span> club of IIT BHU.</span>
          </p>
          <Link href='/pages/Activities'>
            <button className='bg-gradient-to-r from-white to-gray-400 rounded-md w-full sm:w-32 mt-6 px-4 py-2 text-black font-bold text-lg'>
              Explore
            </button>
          </Link>
          <h2 className='text-white text-2xl md:text-4xl font-bold mt-6'>Who Are We?</h2>
          <p className='text-white text-sm md:text-lg leading-relaxed'>
            <span className={roboto.className}>
              The Astronomy Club, IIT (BHU) Varanasi, is a passionate community of space enthusiasts and aspiring astrophysicists. We explore the universe through observational sessions, astrophotography, workshops, and discussions on celestial phenomena. Our club provides a platform for students interested in astronomy, allowing hands-on activities like observational sessions and research projects in astrophysics. Whether you are a seasoned astronomer or just curious about the night sky, the Astronomy Club welcomes all who are eager to explore the vast and beautiful universe. Join us as we reach for the stars!
            </span>
          </p>
        </div>

        <div className='flex justify-center items-center md:w-1/2 relative mt-10 md:mt-0 w-full'>
          <ParticleEffect />
          <motion.div className='absolute' variants={heroVariants} animate="visible">
            <Image src={Hero} height={300} width={300} alt="hero" className='w-48 sm:w-64 md:w-80' />
          </motion.div>
        </div>
      </div>

      <motion.div className="container mx-auto px-4 mt-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <h2 className="text-white text-center text-xl sm:text-3xl font-bold">What Do We Do?</h2>
        <motion.ul className="mt-6 space-y-4 text-white text-sm sm:text-lg px-4 sm:px-20">
          {[
            "🔭 Observational Sessions -  We regularly organize night sky observation events where members can observe planets, star clusters, nebulae, and galaxies through high-powered telescopes.These sessions help students understand celestial navigation, constellations, and real-time  astronomical phenomena like eclipses, meteor showers, and planetary transits.",
            "📷 Astrophotography - We capture breathtaking images of celestial objects, including the Moon, planets, and deep-space objects like nebulae and galaxies. Members learn image processing and the use of specialized equipment to document the beauty of the cosmos.",
            "🚀 The Rocket Team - Our team works on designing, simulating, and launching model rockets, experimenting with aerodynamics, propulsion systems, and payloads. We conduct hands-on sessions where students build and test their own rockets, applying fundamental physics and engineering concepts.",
            "🛰 Satellite Team - We research and develop small satellite projects, focusing on CubeSats. Members get to work on hardware design, software programming, and real-world space applications, preparing them for future opportunities in space technology and exploration."
          ].map((text, index) => (
            <motion.li key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              {text}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <div className='mt-6 bg-gradient-to-r from-black to-white-500 p-4 text-center'>
        <p className='text-white font-bold text-lg md:text-xl'>
          Welcome to the Astronomy Club! Join us in exploring the universe !
        </p>
      </div>

      {!isMobile && (
        <div className='fixed top-0 left-0 pointer-events-none' style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`, zIndex: 1000 }}>
          <Image src={star} alt="Star Cursor" width={30} height={30} />
        </div>
      )}
    </>
  )
}

export default Home;
