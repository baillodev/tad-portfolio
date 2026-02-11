'use client';

import { useEffect, useState } from 'react';
import { getData } from '@/lib/data';
import { FolderOpen, Briefcase, Wrench, User } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getData());
  }, []);

  if (!data) return null;

  const stats = [
    {
      label: 'Projets',
      value: data.projects.length,
      icon: FolderOpen,
      href: '/dashboard/projects',
    },
    {
      label: 'Services',
      value: data.services.length,
      icon: Briefcase,
      href: '/dashboard/services',
    },
    {
      label: 'Outils',
      value: data.tools.length,
      icon: Wrench,
      href: '/dashboard/profile',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display font-bold text-2xl text-white">
          Bienvenue, {data.profile.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-dark-300 mt-1">
          Gérez votre portfolio depuis cet espace.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-6 bg-dark-800/50 border border-dark-700/50 rounded-xl hover:border-accent/15 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon
                  size={18}
                  className="text-dark-400 group-hover:text-accent transition-colors"
                />
                <span className="font-display font-bold text-2xl text-white">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-dark-400">{stat.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Quick access */}
      <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
        <h2 className="font-display font-semibold text-white mb-4">
          Accès rapide
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 p-4 rounded-lg border border-dark-700/40 hover:border-accent/15 transition-all text-sm text-dark-200 hover:text-white"
          >
            <User size={16} className="text-accent" />
            Modifier mon profil
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-3 p-4 rounded-lg border border-dark-700/40 hover:border-accent/15 transition-all text-sm text-dark-200 hover:text-white"
          >
            <FolderOpen size={16} className="text-accent" />
            Ajouter un projet
          </Link>
          <Link
            href="/dashboard/services"
            className="flex items-center gap-3 p-4 rounded-lg border border-dark-700/40 hover:border-accent/15 transition-all text-sm text-dark-200 hover:text-white"
          >
            <Briefcase size={16} className="text-accent" />
            Gérer mes services
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-lg border border-dark-700/40 hover:border-accent/15 transition-all text-sm text-dark-200 hover:text-white"
          >
            <span className="w-4 h-4 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            Voir le portfolio en ligne
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      <div className="mt-8 bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
        <h2 className="font-display font-semibold text-white mb-4">
          Derniers projets
        </h2>
        <div className="space-y-3">
          {data.projects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between py-3 border-b border-dark-700/30 last:border-0"
            >
              <div>
                <span className="text-sm text-white">{project.title}</span>
                <span className="text-xs text-dark-400 ml-3">
                  {project.category}
                </span>
              </div>
              <span className="text-xs text-dark-500 font-mono">
                {project.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
