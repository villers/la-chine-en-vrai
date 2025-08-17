// Configuration des images pour le site
// Images locales téléchargées

export const images = {
  // Images hero pour la page d'accueil
  hero: {
    main: '/images/hero/main.jpg',
    secondary: '/images/hero/main.jpg',
  },

  // Images pour les destinations
  destinations: {
    beijing: '/images/inspirations/culture.jpg',
    shanghai: '/images/inspirations/villes.jpg',
    xian: '/images/inspirations/culture.jpg',
    guilin: '/images/inspirations/nature.jpg',
    chengdu: '/images/inspirations/famille.jpg',
    tibet: '/images/inspirations/nature.jpg',
    hongkong: '/images/inspirations/villes.jpg',
    hangzhou: '/images/inspirations/nature.jpg',
  },

  // Images pour les catégories d'inspiration
  inspirations: {
    gastronomie: '/images/inspirations/gastronomie.jpg',
    culture: '/images/inspirations/culture.jpg',
    nature: '/images/inspirations/nature.jpg',
    villes: '/images/inspirations/villes.jpg',
    secrets: '/images/inspirations/secrets.jpg',
    famille: '/images/inspirations/famille.jpg',
  },

  // Images pour le blog
  blog: {
    guide: '/images/blog/guide.jpg',
    gastronomie: '/images/inspirations/gastronomie.jpg',
    thé: '/images/decorative/calligraphy.jpg',
    routesoie: '/images/inspirations/secrets.jpg',
    temoignage: '/images/inspirations/famille.jpg',
  },

  // Images pour les témoignages (avatars)
  avatars: {
    woman1: '/images/avatars/woman1.jpg',
    man1: '/images/avatars/man1.jpg',
    couple1: '/images/avatars/couple1.jpg',
    family1: '/images/avatars/family1.jpg',
    man2: '/images/avatars/man2.jpg',
    woman2: '/images/avatars/woman2.jpg',
  },

  // Images d'ambiance et décoratives
  decorative: {
    chinesePattern: '/images/decorative/chineseArt.jpg',
    chineseArt: '/images/decorative/chineseArt.jpg',
    calligraphy: '/images/decorative/calligraphy.jpg',
    temple: '/images/decorative/temple.jpg',
  }
};

// Fonction helper pour obtenir une image par catégorie
export function getImage(category: keyof typeof images, name: string): string {
  const categoryImages = images[category] as Record<string, string>;
  return categoryImages[name] || images.hero.main; // Fallback
}

// Images par défaut pour les placeholders
export const placeholders = {
  destination: '/images/inspirations/culture.jpg',
  avatar: '/images/avatars/woman1.jpg',
  blog: '/images/blog/guide.jpg',
};