'use client';

import { useEffect, useRef, useState } from 'react';

const toolLogos = {
  'Adobe Photoshop': 'Ps',
  'Adobe Illustrator': 'Ai',
  'Canva': 'Cv',
  'Figma': 'Fi',
};

const toolColors = {
  'Adobe Photoshop': '#31a8ff',
  'Adobe Illustrator': '#ff9a00',
  'Canva': '#00c4cc',
  'Figma': '#a259ff',
};

export default function Tools({ tools }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tools" className="py-28 px-6 reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          04 &mdash; Outils
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-16">
          Stack créatif
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {tools.map((tool, i) => {
            const abbr = toolLogos[tool.name] || tool.name.slice(0, 2);
            const color = toolColors[tool.name] || '#0ab71a';

            return (
              <div
                key={tool.id}
                className="flex items-center gap-5 p-5 bg-dark-800/40 border border-dark-700/50 rounded-xl"
              >
                {/* Icon badge */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                    color: color,
                  }}
                >
                  {abbr}
                </div>

                {/* Name + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">
                      {tool.name}
                    </span>
                    <span className="text-xs text-dark-400 font-mono">
                      {tool.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full skill-fill"
                      style={{
                        width: visible ? `${tool.level}%` : '0%',
                        background: color,
                        opacity: 0.7,
                        transitionDelay: `${i * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
