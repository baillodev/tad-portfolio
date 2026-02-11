'use client';

import { useEffect, useState } from 'react';
import { getData, saveData, generateId } from '@/lib/data';
import {
  Save,
  Plus,
  Trash2,
  Check,
  Pencil,
  X,
  Pen,
  Palette,
  Crown,
  Layout,
  Layers,
  Eye,
  Sparkles,
  PenTool,
} from 'lucide-react';

const availableIcons = [
  { name: 'Pen', component: Pen },
  { name: 'Palette', component: Palette },
  { name: 'Crown', component: Crown },
  { name: 'Layout', component: Layout },
  { name: 'Layers', component: Layers },
  { name: 'Eye', component: Eye },
  { name: 'Sparkles', component: Sparkles },
  { name: 'PenTool', component: PenTool },
];

export default function ServicesPage() {
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setData(getData());
  }, []);

  if (!data) return null;

  const addService = () => {
    const newService = {
      id: generateId(),
      title: 'Nouveau service',
      description: '',
      icon: 'Pen',
    };
    const updated = { ...data, services: [...data.services, newService] };
    setData(updated);
    setEditing(newService.id);
  };

  const updateService = (id, key, value) => {
    setData({
      ...data,
      services: data.services.map((s) =>
        s.id === id ? { ...s, [key]: value } : s
      ),
    });
  };

  const removeService = (id) => {
    setData({ ...data, services: data.services.filter((s) => s.id !== id) });
    if (editing === id) setEditing(null);
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
            Services
          </h1>
          <p className="text-sm text-dark-300 mt-1">
            Configurez les services affichés sur votre portfolio.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addService}
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

      {/* Services list */}
      <div className="space-y-3">
        {data.services.map((service) => {
          const IconMatch = availableIcons.find(
            (i) => i.name === service.icon
          );
          const Icon = IconMatch ? IconMatch.component : Pen;

          return (
            <div
              key={service.id}
              className="bg-dark-800/50 border border-dark-700/50 rounded-xl overflow-hidden"
            >
              {/* Row header */}
              <div className="flex items-center gap-4 p-4">
                <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-sm text-white font-medium">
                    {service.title}
                  </span>
                  {service.description && (
                    <p className="text-xs text-dark-400 truncate mt-0.5">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setEditing(editing === service.id ? null : service.id)
                    }
                    className="p-2 text-dark-500 hover:text-dark-200 rounded-lg transition-colors"
                  >
                    {editing === service.id ? (
                      <X size={14} />
                    ) : (
                      <Pencil size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => removeService(service.id)}
                    className="p-2 text-dark-500 hover:text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Editor */}
              {editing === service.id && (
                <div className="px-4 pb-5 pt-2 border-t border-dark-700/30">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                        Titre
                      </label>
                      <input
                        value={service.title}
                        onChange={(e) =>
                          updateService(service.id, 'title', e.target.value)
                        }
                        className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                        Icône
                      </label>
                      <div className="flex gap-2">
                        {availableIcons.map((ic) => {
                          const IcComp = ic.component;
                          return (
                            <button
                              key={ic.name}
                              onClick={() =>
                                updateService(service.id, 'icon', ic.name)
                              }
                              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                                service.icon === ic.name
                                  ? 'bg-accent/15 border border-accent/30 text-accent'
                                  : 'bg-dark-900/40 border border-dark-700/30 text-dark-400 hover:text-dark-200'
                              }`}
                              title={ic.name}
                            >
                              <IcComp size={14} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wide">
                      Description
                    </label>
                    <textarea
                      value={service.description}
                      onChange={(e) =>
                        updateService(
                          service.id,
                          'description',
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2.5 bg-dark-900/60 border border-dark-700/40 rounded-lg text-sm text-white resize-none transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {data.services.length === 0 && (
          <div className="text-center py-16 text-dark-400 text-sm">
            Aucun service. Cliquez sur &quot;Ajouter&quot; pour en créer un.
          </div>
        )}
      </div>
    </div>
  );
}
