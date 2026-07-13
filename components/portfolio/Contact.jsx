'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Socials from '@/components/portfolio/Socials';

// Clé publique Web3Forms (elle peut rester dans le code, ce n'est pas un secret).
// Créez-la gratuitement sur https://web3forms.com en entrant l'adresse email
// qui doit RECEVOIR les messages du formulaire, puis collez la clé ci-dessous.
const WEB3FORMS_KEY = 'bb8bf44e-6457-4f3d-b6bd-b07e732be73b';

export default function Contact({ profile }) {
  // status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY.startsWith('REMPLACER')) {
      setStatus('error');
      setError("Le formulaire n'est pas encore configuré. Écris-moi directement par email.");
      return;
    }

    setStatus('sending');
    setError('');

    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', `Nouveau message portfolio — ${formData.get('name')}`);
    formData.append('from_name', 'Portfolio Abdourahmane Diallo');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Erreur inconnue');
      }
    } catch (err) {
      setStatus('error');
      setError("L'envoi a échoué. Réessaie ou contacte-moi par email.");
    }
  };

  const sending = status === 'sending';

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

            {profile.social && (
              <div className="pt-2">
                <div className="text-[0.65rem] text-dark-400 tracking-widest uppercase mb-3 px-1">
                  Réseaux
                </div>
                <Socials social={profile.social} />
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={sending}
                  autoComplete="name"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-dark-800/60 border border-dark-700/60 rounded-lg text-sm text-white placeholder-dark-400 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={sending}
                  autoComplete="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-dark-800/60 border border-dark-700/60 rounded-lg text-sm text-white placeholder-dark-400 transition-all disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                disabled={sending}
                rows={5}
                placeholder="Décrivez votre projet..."
                className="w-full px-4 py-3 bg-dark-800/60 border border-dark-700/60 rounded-lg text-sm text-white placeholder-dark-400 resize-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Honeypot anti-spam (caché) */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              disabled={sending || status === 'success'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 bg-accent text-dark-950 hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <>
                  Envoi en cours <Loader2 size={14} className="animate-spin" />
                </>
              ) : status === 'success' ? (
                <>
                  Message envoyé <CheckCircle2 size={14} />
                </>
              ) : (
                <>
                  Envoyer <Send size={14} />
                </>
              )}
            </button>

            {/* Feedback */}
            {status === 'success' && (
              <p role="status" className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 size={15} className="flex-shrink-0" />
                Merci ! Ton message est bien parti, je te réponds vite.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </p>
            )}
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
