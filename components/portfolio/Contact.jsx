'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Contact({ profile }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    e.target.reset();
  };

  return (
    <section id="contact" className="py-28 px-6 reveal">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          05 &mdash; Contact
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-6">
          Travaillons ensemble
        </h2>
        <p className="text-dark-300 text-sm max-w-lg mb-16 leading-relaxed">
          Un projet en tête, une idée à concrétiser ou simplement envie d&apos;échanger ?
          N&apos;hésitez pas à me contacter. Je réponds généralement sous 24h.
        </p>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-4">
            <ContactLink
              icon={<Mail size={16} />}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactLink
              icon={<Phone size={16} />}
              label="Téléphone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
            />
            <ContactLink
              icon={<MapPin size={16} />}
              label="Localisation"
              value={profile.location}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-dark-800/60 border border-dark-700/60 rounded-lg text-sm text-white placeholder-dark-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-dark-800/60 border border-dark-700/60 rounded-lg text-sm text-white placeholder-dark-400 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Décrivez votre projet..."
                className="w-full px-4 py-3 bg-dark-800/60 border border-dark-700/60 rounded-lg text-sm text-white placeholder-dark-400 resize-none transition-all"
              />
            </div>
            <button
              type="submit"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                sent
                  ? 'bg-accent text-dark-950'
                  : 'bg-accent text-dark-950 hover:bg-accent-dim'
              }`}
            >
              {sent ? (
                'Message envoyé !'
              ) : (
                <>
                  Envoyer <Send size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      href={href}
      target={href?.startsWith('mailto') ? undefined : '_blank'}
      className="flex items-start gap-4 p-4 bg-dark-800/40 border border-dark-700/50 rounded-xl group hover:border-accent/15 transition-all duration-200"
    >
      <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[0.65rem] text-dark-400 tracking-widest uppercase mb-0.5">
          {label}
        </div>
        <div className="text-sm text-white truncate flex items-center gap-1.5">
          {value}
          {href && (
            <ArrowUpRight
              size={12}
              className="text-dark-500 group-hover:text-accent transition-colors flex-shrink-0"
            />
          )}
        </div>
      </div>
    </Tag>
  );
}
