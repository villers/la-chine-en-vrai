# 中国之旅 - Site Web Agence de Voyage Chine

Site web moderne et immersif pour une agence de voyage spécialisée sur la Chine, développé avec Next.js, TypeScript, Tailwind CSS et Firebase.

## 🚀 Fonctionnalités

### Pages principales
- ✅ **Accueil** - Hero section, inspirations, témoignages
- ✅ **À propos** - Vision, valeurs, expertise chinoise
- ✅ **Inspirations** - 6 catégories d'itinéraires interactifs
- ✅ **Voyage sur mesure** - Formulaire intelligent en 5 étapes
- ✅ **Blog** - Articles complets avec système de catégories
- ✅ **Témoignages** - Système dynamique avec Firebase
- ✅ **Contact** - Formulaire + FAQ + informations pratiques
- ✅ **Pages légales** - CGV et Politique de confidentialité

### Fonctionnalités techniques
- ✅ **Redux Toolkit** - Gestion d'état moderne
- ✅ **Firebase Firestore** - Base de données temps réel
- ✅ **API Routes Next.js** - Backend intégré
- ✅ **Newsletter** - Système d'abonnement
- ✅ **SEO optimisé** - Métadonnées, sitemap, robots.txt
- ✅ **Responsive design** - Mobile, tablet, desktop
- ✅ **Émulateur local** - Développement sans cloud

## 🛠️ Tech Stack

- **Framework**: Next.js 15 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Database**: Firebase Firestore
- **Deployment**: Prêt pour Vercel/Netlify

## 🏃‍♂️ Démarrage rapide

### Installation

```bash
# Cloner le projet
git clone [repository]
cd chine-en-vrai

# Installer les dépendances
npm install

# Installer Firebase CLI (global)
npm install -g firebase-tools
```

### Configuration

1. **Variables d'environnement** (optionnel - des valeurs par défaut sont configurées)

```bash
# Copier le fichier d'exemple
cp .env.local.example .env.local

# Éditer avec vos propres clés Firebase (optionnel)
# Le projet fonctionne avec l'émulateur local par défaut
```

2. **Firebase Emulator** (recommandé pour le développement)

```bash
# Démarrer l'émulateur Firebase
npm run emulator

# OU démarrer Next.js + émulateur en parallèle
npm run dev:emulator
```

3. **Développement simple** (sans émulateur)

```bash
# Démarrer uniquement Next.js
npm run dev
```

## 📱 URLs importantes

### Application
- **Site principal**: http://localhost:3000
- **Page admin**: http://localhost:3000/admin (dev uniquement)

### Firebase Emulator
- **Interface UI**: http://localhost:4000
- **Firestore**: http://localhost:8080

## 🎯 Guide de développement

### Ajouter des données de test

1. Démarrer l'émulateur Firebase:
```bash
npm run emulator
```

2. Aller sur http://localhost:3000/admin

3. Cliquer sur "Ajouter des données de test"

### Personnaliser le contenu

- **Blog**: Modifier `src/lib/data/blogPosts.ts`
- **Inspirations**: Modifier `src/app/inspirations/page.tsx`
- **Témoignages**: Ajouter via l'interface ou modifier `src/lib/firebase/seedData.ts`

## 🔧 Scripts disponibles

```bash
npm run dev              # Développement Next.js
npm run dev:emulator     # Next.js + Firebase emulator
npm run build           # Build production
npm run start           # Serveur production
npm run lint            # Linter ESLint
npm run emulator        # Firebase emulator seul
npm run emulator:ui     # Firebase emulator avec UI
```

## 📊 Fonctionnalités Firebase

### Collections Firestore

- **testimonials**: Témoignages clients avec modération
  - Champs: name, location, text, rating, travelType, etc.
  - États: isPublished, isVerified

### Sécurité

- Émulateur local pour le développement
- Validation côté serveur dans les API routes
- Modération manuelle des témoignages

## 🎨 Design & UX

### Thème chinois
- Couleurs rouge et doré
- Caractères chinois (中国之旅)
- Typographie élégante
- Photos immersives

### Responsive
- Mobile-first design
- Breakpoints Tailwind
- Navigation adaptative
- Formulaires optimisés

## 🔐 Sécurité & Production

### Avant le déploiement
- [ ] Supprimer `/admin` ou ajouter authentification
- [ ] Configurer Firebase production
- [ ] Vérifier les API keys
- [ ] Tester les formulaires
- [ ] Optimiser les images

### SEO
- ✅ Métadonnées complètes
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structure sémantique
- ✅ Performance optimisée

---

**Développé avec ❤️ pour découvrir la beauté de la Chine**
