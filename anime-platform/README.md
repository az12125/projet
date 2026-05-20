# 🌟 AnimePlatform

Une plateforme moderne et élégante pour découvrir, organiser et suivre vos animes préférés. Inspirée par Netflix, Crunchyroll et Spotify.

![AnimePlatform](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan?logo=tailwindcss)
![Jikan API](https://img.shields.io/badge/Jikan_API-v4-purple?logo=api)

## ✨ Fonctionnalités

### 🎨 Design & UI/UX
- **Dark Mode Élégant** avec accents violets/bleus néon
- **Glassmorphism** léger et effets de profondeur premium
- **Animations Fluides** avec Framer Motion
- **Responsive** Mobile + Desktop
- **Skeleton Loading** pour une expérience utilisateur optimale

### 📱 Pages Incluses
- **Accueil** - Hero cinématique, tendances, populaires, meilleures notes
- **Détails Anime** - Informations complètes, trailer YouTube, recommandations
- **Genres** - Découverte par genre avec filtres
- **Ma Liste** - Gestion des listes (À regarder, En cours, Terminé, Favoris)
- **Profil** - Statistiques personnelles, activité récente
- **Paramètres** - Préférences utilisateur

### 🔧 Fonctionnalités Techniques
- **API Jikan** - Base de données complète d'animes
- **Recherche Ultra Rapide**
- **Filtres Avancés** - Genre, année, studio, statut
- **Système de Listes Personnelles**
- **Authentification** prête à l'emploi (NextAuth)
- **Base de Données** MongoDB/PostgreSQL ready

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
cd anime-platform
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans votre navigateur**
```
http://localhost:3000
```

## 📁 Structure du Projet

```
anime-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── layout.tsx         # Layout principal
│   │   ├── globals.css        # Styles globaux
│   │   ├── anime/[id]/        # Page détails anime
│   │   ├── genres/            # Page genres
│   │   ├── lists/             # Page listes personnelles
│   │   ├── profile/           # Page profil
│   │   └── settings/          # Page paramètres
│   ├── components/
│   │   ├── anime/             # Composants anime
│   │   │   ├── AnimeCard.tsx
│   │   │   ├── AnimeCarousel.tsx
│   │   │   └── HeroSection.tsx
│   │   └── layout/            # Composants layout
│   │       └── Navbar.tsx
│   ├── lib/
│   │   └── api.ts             # API Jikan client
│   ├── types/
│   │   └── index.ts           # Types TypeScript
│   └── hooks/                 # Custom hooks
├── public/                     # Assets statiques
├── tailwind.config.ts         # Configuration Tailwind
├── next.config.js             # Configuration Next.js
└── package.json               # Dépendances
```

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.ts` pour changer la palette de couleurs :

```ts
colors: {
  background: '#0a0a0f',
  primary: '#8b5cf6',
  secondary: '#06b6d4',
  accent: '#ec4899',
}
```

### Animations
Les animations sont configurées dans `globals.css` et utilisent Framer Motion.

## 📊 API Utilisée

Cette application utilise **Jikan API v4** (MyAnimeList unofficial API) :
- ✅ Gratuite et sans authentification
- ✅ Plus de 20,000+ animes
- ✅ Mises à jour régulières
- ✅ Documentation : https://jikan.moe/

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Icons**: Lucide React
- **API**: Jikan API v4
- **Auth**: NextAuth.js (optionnel)
- **Database**: MongoDB/PostgreSQL (optionnel)

## 📝 Licence

Ce projet est open source et disponible sous licence MIT.

---

Développé avec ❤️ pour les fans d'anime
