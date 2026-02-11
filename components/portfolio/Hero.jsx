'use client';

import { ArrowDown } from 'lucide-react';

export default function Hero({ profile }) {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#c8c9cc 1px, transparent 1px), linear-gradient(90deg, #c8c9cc 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative text-center max-w-3xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark-600 bg-dark-800/60 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-dark-200 tracking-wide">
            {profile.availability}
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display font-800 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-white mb-6">
          {profile.name}
        </h1>

        {/* Title */}
        <p className="text-lg md:text-xl text-dark-200 font-light mb-4">
          {profile.title}
        </p>

        {/* Specialty line */}
        <p className="text-sm text-dark-300 tracking-widest uppercase font-mono">
          Logo &middot; Branding &middot; Identité Visuelle
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent text-dark-950 text-sm font-semibold rounded-lg hover:bg-accent-dim transition-colors duration-200"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-dark-500 text-dark-100 text-sm font-medium rounded-lg hover:border-dark-300 transition-colors duration-200"
          >
            Me contacter
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="inline-flex mt-20 text-dark-400 hover:text-accent transition-colors duration-200 animate-bounce"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
