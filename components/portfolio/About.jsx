'use client';

import { MapPin, Mail, Phone } from 'lucide-react';

export default function About({ profile }) {
  return (
    <section id="about" className="py-28 px-6 reveal">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left - label */}
          <div className="md:col-span-2">
            <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
              01 &mdash; À propos
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">
              Qui suis-je
            </h2>
          </div>

          {/* Right - content */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-dark-200 leading-relaxed text-[0.95rem]">
              {profile.bio}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-dark-300">
                <MapPin size={15} className="text-accent flex-shrink-0" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-300">
                <Mail size={15} className="text-accent flex-shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-300">
                <Phone size={15} className="text-accent flex-shrink-0" />
                <span>{profile.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
