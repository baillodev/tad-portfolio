'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  FolderOpen,
  Briefcase,
  Wrench,
  LogOut,
  Lock,
  Eye,
} from 'lucide-react';

const ADMIN_KEY = 'portfolio_admin_auth';
const DEFAULT_PIN = '0000'; // Le designer change ce PIN depuis les settings

const navItems = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profil', icon: User },
  { href: '/dashboard/projects', label: 'Projets', icon: FolderOpen },
  { href: '/dashboard/services', label: 'Services', icon: Briefcase },
];

export default function DashboardLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem(ADMIN_KEY);
    if (auth === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('portfolio_admin_pin') || DEFAULT_PIN;
    if (pin === storedPin) {
      sessionStorage.setItem(ADMIN_KEY, 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setAuthenticated(false);
    setPin('');
  };

  // ── Auth gate ──
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950 px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center mx-auto mb-5">
              <Lock size={22} className="text-accent" />
            </div>
            <h1 className="font-display font-bold text-xl text-white">
              Espace Administration
            </h1>
            <p className="text-sm text-dark-400 mt-2">
              Entrez votre code PIN pour accéder au dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Code PIN"
              maxLength={20}
              className={`w-full px-4 py-3 bg-dark-800/60 border rounded-lg text-sm text-white text-center tracking-[0.5em] placeholder-dark-500 font-mono transition-all ${
                error ? 'border-red-500/50' : 'border-dark-700/60'
              }`}
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-400 text-center">
                Code PIN incorrect.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-accent text-dark-950 text-sm font-semibold rounded-lg hover:bg-accent-dim transition-colors"
            >
              Accéder
            </button>
          </form>

          <p className="text-center mt-8 text-xs text-dark-500">
            PIN par défaut : 0000
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard layout ──
  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-dark-900 border-r border-dark-700/50 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="px-5 h-16 flex items-center border-b border-dark-700/50">
          <span className="font-display font-bold text-base text-white">
            AD<span className="text-accent">.</span>
          </span>
          <span className="text-xs text-dark-400 ml-2 font-mono">admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800/60'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-dark-700/50 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-dark-400 hover:text-white hover:bg-dark-800/60 transition-all"
          >
            <Eye size={16} />
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-dark-400 hover:text-red-400 hover:bg-dark-800/60 transition-all"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60">
        <div className="p-8 max-w-5xl dash-fade-in">{children}</div>
      </main>
    </div>
  );
}
