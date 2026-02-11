'use client';

import { useEffect, useState } from 'react';
import { getData, saveData, generateId } from '@/lib/data';
import { Save, Plus, Trash2, Check } from 'lucide-react';

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {
    setData(getData());
    setPin(localStorage.getItem('portfolio_admin_pin') || '0000');
  }, []);

  if (!data) return null;

  const updateProfile = (key, value) => {
    setData({
      ...data,
      profile: { ...data.profile, [key]: value },
    });
  };

  const updateTool = (id, key, value) => {
    setData({
      ...data,
      tools: data.tools.map((t) =>
        t.id === id ? { ...t, [key]: key === 'level' ? Number(value) : value } : t
      ),
    });
  };

  const addTool = () => {
    setData({
      ...data,
      tools: [
        ...data.tools,
        { id: generateId(), name: 'Nouvel outil', level: 50 },
      ],
    });
  };

  const removeTool = (id) => {
    setData({ ...data, tools: data.tools.filter((t) => t.id !== id) });
  };

  const handleSave = () => {
    saveData(data);
    localStorage.setItem('portfolio_admin_pin', pin);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">
            Profil
          </h1>
          <p className="text-sm text-dark-300 mt-1">
            Modifiez vos informations personnelles et vos outils.
          </p>
        </div>
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

      <div className="space-y-8">
        {/* Profile section */}
        <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
          <h2 className="font-display font-semibold text-white mb-6 text-sm tracking-wide">
            Informations générales
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              label="Nom complet"
              value={data.profile.name}
              onChange={(v) => updateProfile('name', v)}
            />
            <Field
              label="Titre"
              value={data.profile.title}
              onChange={(v) => updateProfile('title', v)}
            />
            <Field
              label="Email"
              value={data.profile.email}
              onChange={(v) => updateProfile('email', v)}
            />
            <Field
              label="Téléphone"
              value={data.profile.phone}
              onChange={(v) => updateProfile('phone', v)}
            />
            <Field
              label="Localisation"
              value={data.profile.location}
              onChange={(v) => updateProfile('location', v)}
            />
            <Field
              label="Disponibilité"
              value={data.profile.availability}
              onChange={(v) => updateProfile('availability', v)}
            />
          </div>
          <div className="mt-5">
            <label className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
              Bio
            </label>
            <textarea
              value={data.profile.bio}
              onChange={(e) => updateProfile('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-dark-900/60 border border-dark-700/50 rounded-lg text-sm text-white resize-none transition-all"
            />
          </div>
        </div>

        {/* Tools section */}
        <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-white text-sm tracking-wide">
              Outils
            </h2>
            <button
              onClick={addTool}
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-dim transition-colors"
            >
              <Plus size={14} />
              Ajouter
            </button>
          </div>

          <div className="space-y-3">
            {data.tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center gap-4 p-3 bg-dark-900/40 border border-dark-700/30 rounded-lg"
              >
                <input
                  value={tool.name}
                  onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 bg-transparent border border-dark-700/40 rounded text-sm text-white transition-all"
                />
                <div className="flex items-center gap-2 w-32">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tool.level}
                    onChange={(e) => updateTool(tool.id, 'level', e.target.value)}
                    className="flex-1 accent-[#0ab71a]"
                  />
                  <span className="text-xs text-dark-400 w-8 text-right font-mono">
                    {tool.level}
                  </span>
                </div>
                <button
                  onClick={() => removeTool(tool.id)}
                  className="text-dark-500 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security section */}
        <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-6">
          <h2 className="font-display font-semibold text-white mb-6 text-sm tracking-wide">
            Sécurité
          </h2>
          <div className="max-w-xs">
            <label className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
              Code PIN du dashboard
            </label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 bg-dark-900/60 border border-dark-700/50 rounded-lg text-sm text-white font-mono tracking-widest transition-all"
            />
            <p className="text-xs text-dark-500 mt-2">
              Ce code protège l&apos;accès à votre dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs text-dark-400 mb-2 tracking-wide uppercase">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-dark-900/60 border border-dark-700/50 rounded-lg text-sm text-white transition-all"
      />
    </div>
  );
}
