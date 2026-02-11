'use client';

import { useEffect, useState } from 'react';
import { getData, saveData, generateId } from '@/lib/data';
import {
  Save,
  Plus,
  Trash2,
  Check,
  GripVertical,
  Star,
  ChevronDown,
  ChevronUp,
  Pencil,
  X,
} from 'lucide-react';

export default function ProjectsPage() {
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setData(getData());
  }, []);

  if (!data) return null;

  const addProject = () => {
    const newProject = {
      id: generateId(),
      title: 'Nouveau projet',
      category: 'Logo Design',
      description: '',
      image: '',
      year: new Date().getFullYear().toString(),
      featured: false,
    };
    const updated = { ...data, projects: [newProject, ...data.projects] };
    setData(updated);
    setEditing(newProject.id);
  };

  const updateProject = (id, key, value) => {
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [key]: value } : p
      ),
    });
  };

  const removeProject = (id) => {
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
    if (editing === id) setEditing(null);
  };

  const toggleFeatured = (id) => {
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      ),
    });
  };

  const moveProject = (index, direction) => {
    const newProjects = [...data.projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    [newProjects[index], newProjects[targetIndex]] = [
      newProjects[targetIndex],
      newProjects[index],
    ];
    setData({ ...data, projects: newProjects });
  };

  const handleSave = () => {
    saveData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">
            Projets
          </h1>
          <p className="text-sm text-dark-300 mt-1">
            Ajoutez, modifiez et organisez vos projets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border border-dark-600 text-dark-200 hover:text-white hover:border-dark-400 transition-all"
          >
            <Plus size={14} />
            Ajouter
          </button>
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              saved
                ? 'bg-accent text-dark-950'
                : 'bg-accent text-dark-950 hover:bg-accent-dim'
            }`}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Enregistré' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-3">
        {data.projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-dark-800/50 border border-dark-700/50 rounded-xl overflow-hidden"
          >
            {/* Row header */}
            <div className="flex items-center gap-4 p-4">
              {/* Reorder */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveProject(index, 'up')}
                  className="text-dark-500 hover:text-dark-200 transition-colors"
                  disabled={index === 0}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveProject(index, 'down')}
                  className="text-dark-500 hover:text-dark-200 transition-colors"
                  disabled={index === data.projects.length - 1}
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium truncate">
                    {project.title}
                  </span>
                  {project.featured && (
                    <Star size={12} className="text-accent flex-shrink-0" fill="currentColor" />
                  )}
                </div>
                <span className="text-xs text-dark-400">
                  {project.category} &middot; {project.year}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFeatured(project.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    project.featured
                      ? 'text-accent bg-accent/10'
                      : 'text-dark-500 hover:text-dark-200'
                  }`}
                  title="Mettre en avant"
                >
                  <Star size={14} />
                </button>
                <button
                  onClick={() =>
                    setEditing(editing === project.id ? null : project.id)
                  }
                  className="p-2 text-dark-500 hover:text-dark-200 rounded-lg transition-colors"
                >
                  {editing === project.id ? (
                    <X size={14} />
                  ) : (
                    <Pencil size={14} />
                  )}
                </button>
                <button
                  onClick={() => removeProject(project.id)}
                  className="p-2 text-dark-500 hover:text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Expanded editor */}
            {editing === project.id && (
              <div className="px-4 pb-5 pt-2 border-t border-dark-700/30">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                      Titre
                    </label>
                    <input
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, 'title', e.target.value)
                      }
                      className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                      Catégorie
                    </label>
                    <input
                      value={project.category}
                      onChange={(e) =>
                        updateProject(project.id, 'category', e.target.value)
                      }
                      className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                      Année
                    </label>
                    <input
                      value={project.year}
                      onChange={(e) =>
                        updateProject(project.id, 'year', e.target.value)
                      }
                      className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                      Image (URL ou chemin)
                    </label>
                    <input
                      value={project.image}
                      onChange={(e) =>
                        updateProject(project.id, 'image', e.target.value)
                      }
                      placeholder="/projects/nom-image.jpg"
                      className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white placeholder-dark-500 transition-all"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, 'description', e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white resize-none transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {data.projects.length === 0 && (
          <div className="text-center py-16 text-dark-400 text-sm">
            Aucun projet pour le moment. Cliquez sur &quot;Ajouter&quot; pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}
