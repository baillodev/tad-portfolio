// lib/data.js
// Centralized data store using localStorage for persistence.
// The dashboard writes to it, the portfolio reads from it.

const STORAGE_KEY = 'portfolio_data';

const defaultData = {
  profile: {
    name: 'Abdourahmane Diallo',
    title: 'Directeur Artistique & Designer Graphique',
    bio: 'Designer graphique passionné, spécialisé dans la création d\'identités visuelles fortes et mémorables. Je transforme les visions de mes clients en expériences visuelles percutantes, alliant créativité, rigueur et sens du détail pour chaque projet.',
    email: 'taddiallo10@gmail.com',
    phone: '+224 625 44 19 45',
    location: 'Conakry, Guinée',
    availability: 'Disponible pour de nouveaux projets',
    photo: '/tad.jpg',
    social: {
      instagram: 'https://instagram.com/',
      behance: 'https://behance.net/',
      linkedin: 'https://linkedin.com/in/',
    },
  },
  services: [
    {
      id: '1',
      title: 'Logo Design',
      description: 'Conception de logos uniques et distinctifs qui capturent l\'essence de votre marque. Chaque logo est pensé pour être mémorable, polyvalent et intemporel.',
      icon: 'Pen',
    },
    {
      id: '2',
      title: 'Identité Visuelle',
      description: 'Création de systèmes visuels complets : palette de couleurs, typographie, guidelines et déclinaisons pour assurer une cohérence sur tous vos supports.',
      icon: 'Palette',
    },
    {
      id: '3',
      title: 'Branding',
      description: 'Stratégie de marque globale, du positionnement à l\'exécution visuelle. Je construis des marques qui résonnent avec votre audience cible.',
      icon: 'Crown',
    },
    {
      id: '4',
      title: 'Design Print & Digital',
      description: 'Création de supports visuels pour le print (cartes de visite, flyers, affiches) et le digital (posts réseaux sociaux, bannières, présentations).',
      icon: 'Layout',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'Volta Energy',
      category: 'Logo & Branding',
      description: 'Identité visuelle complète pour une startup dans le secteur des énergies renouvelables. Logo, charte graphique et déclinaisons.',
      image: '/projects/project-1.jpg',
      year: '2025',
      featured: true,
    },
    {
      id: '2',
      title: 'Café Nomade',
      category: 'Identité Visuelle',
      description: 'Rebranding complet pour une chaîne de coffee shops artisanaux. Nouveau logo, packaging et signalétique.',
      image: '/projects/project-2.jpg',
      year: '2025',
      featured: true,
    },
    {
      id: '3',
      title: 'Festival Nalu',
      category: 'Design Print',
      description: 'Direction artistique et création de l\'ensemble des supports visuels pour un festival culturel.',
      image: '/projects/project-3.jpg',
      year: '2024',
      featured: false,
    },
    {
      id: '4',
      title: 'Nimba Tech',
      category: 'Logo Design',
      description: 'Logo et identité visuelle pour une entreprise technologique basée à Conakry.',
      image: '/projects/project-4.jpg',
      year: '2024',
      featured: true,
    },
  ],
  tools: [
    { id: '1', name: 'Adobe Photoshop', level: 90 },
    { id: '2', name: 'Adobe Illustrator', level: 95 },
    { id: '3', name: 'Canva', level: 85 },
    { id: '4', name: 'Figma', level: 80 },
  ],
};

export function getData() {
  if (typeof window === 'undefined') return defaultData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure new fields are always present
      return {
        profile: { ...defaultData.profile, ...parsed.profile },
        services: parsed.services?.length ? parsed.services : defaultData.services,
        projects: parsed.projects?.length ? parsed.projects : defaultData.projects,
        tools: parsed.tools?.length ? parsed.tools : defaultData.tools,
      };
    }
  } catch (e) {
    console.error('Failed to read portfolio data:', e);
  }
  return defaultData;
}

export function saveData(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save portfolio data:', e);
  }
}

export function getDefaults() {
  return defaultData;
}

export function resetData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// Generate unique IDs
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
