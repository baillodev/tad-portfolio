'use client';

import { useEffect, useState } from 'react';
import { getData } from '@/lib/data';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Services from '@/components/portfolio/Services';
import Projects from '@/components/portfolio/Projects';
import Tools from '@/components/portfolio/Tools';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getData());
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Services services={data.services} />
        <Projects projects={data.projects} />
        <Tools tools={data.tools} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </>
  );
}
