'use client';

import { Pen, Palette, Crown, Layout, Layers, Eye, Sparkles, PenTool } from 'lucide-react';

const iconMap = {
  Pen: Pen,
  Palette: Palette,
  Crown: Crown,
  Layout: Layout,
  Layers: Layers,
  Eye: Eye,
  Sparkles: Sparkles,
  PenTool: PenTool,
};

export default function Services({ services }) {
  return (
    <section id="services" className="py-28 px-6 reveal">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          02 &mdash; Services
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-16">
          Ce que je fais
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon] || Pen;
            return (
              <div
                key={service.id}
                className="group p-7 bg-dark-800/40 border border-dark-700/50 rounded-xl hover:border-accent/20 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/8 border border-accent/10 flex items-center justify-center mb-5">
                  <IconComponent size={18} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-dark-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
