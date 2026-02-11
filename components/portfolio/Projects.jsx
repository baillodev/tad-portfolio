'use client';

import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', ...new Set(projects.map((p) => p.category))];
  const filtered =
    filter === 'Tous' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 px-6 reveal">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          03 &mdash; Portfolio
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-6">
          Projets sélectionnés
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                filter === cat
                  ? 'border-accent/40 bg-accent/10 text-accent'
                  : 'border-dark-600 text-dark-300 hover:border-dark-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-dark-400 text-sm">
            Aucun projet dans cette catégorie.
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-dark-800/40 border border-dark-700/50 rounded-xl overflow-hidden hover:border-accent/15 transition-all duration-300">
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden bg-dark-800">
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center project-img-placeholder">
            <Layers size={32} className="text-dark-500" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.65rem] text-accent tracking-widest uppercase font-mono">
            {project.category}
          </span>
          <span className="text-[0.65rem] text-dark-400 font-mono">
            {project.year}
          </span>
        </div>
        <h3 className="font-display font-semibold text-white text-lg mb-2 flex items-center gap-2">
          {project.title}
          <ArrowUpRight
            size={14}
            className="text-dark-400 group-hover:text-accent transition-colors duration-200"
          />
        </h3>
        <p className="text-sm text-dark-300 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}
