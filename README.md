# Portfolio — Abdourahmane Diallo

Portfolio professionnel de designer graphique avec dashboard d'administration intégré.

## Stack technique

- **Next.js 14** (App Router)
- **Tailwind CSS** (dark theme, couleur accent `#0ab71a`)
- **Lucide React** (icônes)
- **localStorage** (persistance des données)

## Installation

```bash
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:3000`.

## Structure

```
/                    → Portfolio public
/dashboard           → Dashboard admin (protégé par PIN)
/dashboard/profile   → Modifier profil & outils
/dashboard/projects  → Gérer les projets
/dashboard/services  → Gérer les services
```

## Dashboard

Accédez au dashboard via `/dashboard`. Le code PIN par défaut est `0000`.
Vous pouvez le modifier depuis l'onglet "Profil" > "Sécurité" du dashboard.

Toutes les modifications faites depuis le dashboard sont immédiatement
reflétées sur le portfolio public (après rafraîchissement de la page).

## Formulaire de contact

Le formulaire envoie les messages par email via [Web3Forms](https://web3forms.com)
(gratuit). Pour l'activer :

1. Va sur web3forms.com et entre **l'adresse email qui doit recevoir les messages**.
2. Copie l'**Access Key** reçue.
3. Colle-la dans la constante `WEB3FORMS_KEY` en haut de
   [components/portfolio/Contact.jsx](components/portfolio/Contact.jsx).

La clé est publique (pas un secret) : elle peut rester dans le code, aucun
fichier `.env` ni redéploiement manuel n'est nécessaire. Tant qu'elle n'est pas
renseignée, le formulaire affiche un message invitant à écrire par email.

## Réseaux sociaux

Renseigne tes liens Instagram / Behance / LinkedIn dans `profile.social`
de [lib/data.js](lib/data.js). Un lien vide est automatiquement masqué.

## SEO & partage

Les meta tags, le favicon (`app/icon.svg`) et l'image de partage dynamique
(`app/opengraph-image.js`) sont déjà configurés. Pense à mettre à jour
`SITE_URL` dans [app/layout.js](app/layout.js) si ton domaine change.

## Images des projets

Placez vos images dans le dossier `public/projects/` et référencez-les
dans le dashboard avec le chemin `/projects/nom-image.jpg`.

## Déploiement

Pour un déploiement en production (Vercel, Netlify, etc.) :

```bash
npm run build
npm start
```

Pour le dashboard en sous-domaine (`admin.votresite.com`), configurez
un middleware Next.js avec réécriture de routes dans votre hébergeur.
