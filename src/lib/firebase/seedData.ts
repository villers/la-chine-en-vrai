import { createPublishedTestimonial } from './createPublishedTestimonial';
import { addNewsletterSubscriber } from './newsletter';
import { createPublishedBlogPost } from './blog';
import { createActiveInspiration } from './inspirations';

// Données de démo pour les témoignages
const demoTestimonials = [
  {
    name: 'Sophie Martinez',
    location: 'Paris, France',
    text: 'Un voyage absolument extraordinaire ! L\'équipe a su créer un itinéraire parfaitement adapté à nos envies. Nous avons découvert la vraie Chine, celle des locaux, avec des expériences uniques que nous n\'aurions jamais pu vivre seuls.',
    rating: 5,
    travelType: 'Voyage sur mesure',
    travelDate: '2024-03-15'
  },
  {
    name: 'Marc Dubois',
    location: 'Lyon, France',
    text: 'Excellente organisation du voyage. Les guides locaux étaient passionnants et nous ont fait découvrir des endroits secrets. La cuisine authentique était un régal ! Je recommande vivement.',
    rating: 5,
    travelType: 'Gastronomie & Culture',
    travelDate: '2024-02-20'
  },
  {
    name: 'Claire & Thomas',
    location: 'Bordeaux, France',
    text: 'Notre lune de miel en Chine restera inoubliable. De la Grande Muraille aux rizières de Guilin, chaque moment était magique. L\'accompagnement était parfait du début à la fin.',
    rating: 5,
    travelType: 'Voyage de noces',
    travelDate: '2024-01-10'
  },
  {
    name: 'Famille Rousseau',
    location: 'Nantes, France',
    text: 'Voyage parfait avec nos enfants (8 et 12 ans). Les activités étaient adaptées à toute la famille. Les enfants ont adoré voir les pandas à Chengdu ! Organisation impeccable.',
    rating: 5,
    travelType: 'Voyage familial',
    travelDate: '2023-12-05'
  },
  {
    name: 'Jean-Pierre Martin',
    location: 'Marseille, France',
    text: 'En tant que photographe, j\'avais des attentes élevées. L\'équipe m\'a emmené dans des lieux exceptionnels pour capturer la beauté de la Chine. Des souvenirs et des photos extraordinaires.',
    rating: 5,
    travelType: 'Voyage photo',
    travelDate: '2023-11-20'
  },
  {
    name: 'Amélie Bernard',
    location: 'Toulouse, France',
    text: 'Mon premier voyage en solo en Chine. Je me sentais en sécurité grâce à l\'accompagnement et j\'ai vécu des moments authentiques incroyables. Une expérience qui m\'a transformée !',
    rating: 5,
    travelType: 'Voyage solo',
    travelDate: '2023-10-15'
  }
];

// Données de démo pour la newsletter
const demoNewsletterEmails = [
  'marie.dupont@example.com',
  'pierre.martin@example.com',
  'claire.bernard@example.com',
  'thomas.rousseau@example.com',
  'sophie.chen@example.com'
];

// Données de démo pour les articles de blog
const demoBlogPosts = [
  {
    title: 'Guide complet pour votre premier voyage en Chine',
    excerpt: 'Découvrez tous nos conseils essentiels pour préparer votre première aventure dans l\'Empire du Milieu.',
    content: `
# Guide complet pour votre premier voyage en Chine

La Chine, pays aux mille facettes, peut sembler intimidante pour un premier voyage. Voici notre guide complet pour vous préparer sereinement à cette aventure extraordinaire.

## Avant le départ

### Visa et formalités
Tous les ressortissants français ont besoin d'un visa pour entrer en Chine. La demande doit être faite au consulat de Chine avec :
- Passeport valide 6 mois minimum
- Formulaire de demande complété
- Photo d'identité récente
- Réservation d'hôtel et billet d'avion

### Santé et vaccinations
Aucun vaccin n'est obligatoire, mais nous recommandons :
- Hépatite A et B
- Encéphalite japonaise (selon les régions)
- Traitement antipaludéen (zones rurales du Sud)

## Sur place

### Transport
- **Train** : Réseau TGV excellent, réservation en ligne possible
- **Métro** : Dans toutes les grandes villes, très pratique
- **Taxi** : Uber et DiDi disponibles
- **Avion** : Pour les longues distances

### Communication
- VPN recommandé pour accéder à Google, Facebook
- WeChat indispensable pour les paiements
- Traducteur hors ligne conseillé

## Culture et savoir-vivre

### Étiquette
- Saluer en inclinant légèrement la tête
- Recevoir une carte de visite à deux mains
- Ne pas planter ses baguettes dans le riz
- Éviter de pointer du doigt

### Négociation
La négociation fait partie de la culture, surtout sur les marchés. Commencez par diviser le prix par 3 ou 4.

## Nos destinations incontournables

1. **Pékin** - Cité Interdite, Grande Muraille
2. **Shanghai** - Modernité et traditions
3. **Xi'an** - Armée de Terre Cuite
4. **Guilin** - Paysages de carte postale
5. **Chengdu** - Pandas géants

La Chine vous attend pour une expérience inoubliable !
    `,
    author: 'Marie Chen',
    publishedAt: '2024-01-15',
    category: 'Conseils pratiques',
    tags: ['guide', 'premier voyage', 'conseils', 'préparation'],
    readingTime: '8 min',
    image: '/images/blog/guide.jpg',
    slug: 'guide-complet-premier-voyage-chine'
  },
  {
    title: 'Les 5 plats chinois à absolument goûter',
    excerpt: 'Un voyage culinaire à travers les saveurs authentiques de la Chine, des classiques aux spécialités régionales.',
    content: `
# Les 5 plats chinois à absolument goûter

La gastronomie chinoise va bien au-delà des plats que l'on connaît en France. Voici 5 spécialités authentiques à ne pas manquer lors de votre voyage.

## 1. Le Canard Laqué de Pékin (北京烤鸭)

### Histoire
Plat emblématique de la capitale, le canard laqué est préparé selon une tradition vieille de 600 ans.

### Dégustation
Servi avec des crêpes fines, des oignons verts et une sauce hoisin, c'est un rituel culinaire à part entière.

### Où le déguster
- Restaurant Quanjude (全聚德) - Institution depuis 1864
- Da Dong - Version moderne et raffinée

## 2. Les Xiaolongbao de Shanghai (小笼包)

Ces petits pains vapeur fourrés au porc et au bouillon sont un art culinaire. La technique pour les manger sans se brûler est tout un apprentissage !

**Astuce** : Percez délicatement avec une baguette et aspirez le bouillon avant de croquer.

## 3. Le Mapo Tofu du Sichuan (麻婆豆腐)

Plat emblématique de la cuisine du Sichuan, ce tofu soyeux dans une sauce épicée au poivre de Sichuan est addictif.

**Niveau de piment** : Demandez "不要太辣" (bù yào tài là) pour "pas trop épicé"

## 4. Le Bœuf aux Nouilles de Lanzhou (兰州拉面)

Ces nouilles étirées à la main dans un bouillon de bœuf clair sont un petit-déjeuner typique du Nord-Ouest.

**Particularité** : Les nouilles sont étirées devant vous, spectacle garanti !

## 5. Les Dim Sum de Canton (广式点心)

L'art du dim sum cantonais est reconnu au patrimoine mondial de l'UNESCO. C'est tout un univers de petites bouchées vapeur.

### Incontournables
- Har Gow (crevettes)
- Siu Mai (porc et crevettes)
- Char Siu Bao (porc laqué)

## Conseils pour bien manger en Chine

- Mangez où mangent les locaux
- N'hésitez pas à pointer les plats qui vous plaisent
- Buvez du thé pour accompagner vos repas
- Laissez toujours un peu dans votre assiette (signe de satiété)

Bon appétit et bonne découverte !
    `,
    author: 'Chef Liu Wei',
    publishedAt: '2024-01-10',
    category: 'Gastronomie',
    tags: ['cuisine', 'gastronomie', 'plats typiques', 'culture'],
    readingTime: '6 min',
    image: '/images/inspirations/gastronomie.jpg',
    slug: 'cinq-plats-chinois-absolument-gouter'
  }
];

// Données de démo pour les inspirations
const demoInspirations = [
  {
    categoryId: 'gastronomie',
    title: 'Gastronomie & Saveurs',
    description: 'Un voyage culinaire à travers les 8 grandes cuisines chinoises',
    image: '/images/inspirations/gastronomie.jpg',
    order: 1,
    itineraries: [
      {
        title: 'Route des Saveurs du Sichuan',
        duration: '10 jours',
        highlights: ['Chengdu', 'Leshan', 'Emeishan'],
        description: 'Découvrez la cuisine épicée du Sichuan, rencontrez des chefs locaux et apprenez à cuisiner le mapo tofu authentique.',
        price: 'À partir de 2 200€'
      },
      {
        title: 'Marché de Canton & Dim Sum',
        duration: '7 jours',
        highlights: ['Canton', 'Shunde', 'Foshan'],
        description: 'Explorez les marchés traditionnels et maîtrisez l\'art du dim sum avec des maîtres cuisiniers.',
        price: 'À partir de 1 800€'
      }
    ]
  },
  {
    categoryId: 'culture',
    title: 'Culture & Traditions',
    description: 'Plongez dans 5000 ans d\'histoire et de traditions',
    image: '/images/inspirations/culture.jpg',
    order: 2,
    itineraries: [
      {
        title: 'Capitales Impériales',
        duration: '12 jours',
        highlights: ['Pékin', 'Xi\'an', 'Luoyang'],
        description: 'Visitez la Cité Interdite, l\'Armée de Terre Cuite et les grottes de Longmen.',
        price: 'À partir de 2 800€'
      },
      {
        title: 'Route de la Soie',
        duration: '15 jours',
        highlights: ['Dunhuang', 'Turpan', 'Kashgar'],
        description: 'Suivez les traces de Marco Polo sur l\'ancienne Route de la Soie.',
        price: 'À partir de 3 200€'
      }
    ]
  },
  {
    categoryId: 'nature',
    title: 'Nature & Paysages',
    description: 'Des rizières aux sommets enneigés',
    image: '/images/inspirations/nature.jpg',
    order: 3,
    itineraries: [
      {
        title: 'Merveilles de Guilin',
        duration: '8 jours',
        highlights: ['Guilin', 'Yangshuo', 'Longji'],
        description: 'Naviguez sur la rivière Li et découvrez les rizières en terrasses.',
        price: 'À partir de 1 900€'
      },
      {
        title: 'Tibet & Montagnes Sacrées',
        duration: '14 jours',
        highlights: ['Lhassa', 'Shigatse', 'Camp de base Everest'],
        description: 'Une expérience spirituelle unique sur le toit du monde.',
        price: 'À partir de 3 800€'
      }
    ]
  }
];

/**
 * Initialise Firebase avec des données de démo
 */
export async function seedFirebaseData() {
  console.log('🌱 Initialisation des données de démo...');
  
  try {
    // Ajouter les témoignages de démo
    console.log('Ajout des témoignages de démo...');
    for (const testimonial of demoTestimonials) {
      try {
        await createPublishedTestimonial(testimonial);
        console.log(`✅ Témoignage ajouté: ${testimonial.name}`);
      } catch (error) {
        console.log(`⚠️  Témoignage déjà existant ou erreur: ${testimonial.name}`);
      }
    }
    
    // Ajouter les abonnés newsletter de démo
    console.log('Ajout des abonnés newsletter de démo...');
    for (const email of demoNewsletterEmails) {
      try {
        await addNewsletterSubscriber(email, 'demo');
        console.log(`✅ Abonné ajouté: ${email}`);
      } catch (error) {
        console.log(`⚠️  Abonné déjà existant ou erreur: ${email}`);
      }
    }
    
    // Ajouter les articles de blog de démo
    console.log('Ajout des articles de blog de démo...');
    for (const blogPost of demoBlogPosts) {
      try {
        await createPublishedBlogPost(blogPost);
        console.log(`✅ Article ajouté: ${blogPost.title}`);
      } catch (error) {
        console.log(`⚠️  Article déjà existant ou erreur: ${blogPost.title}`);
      }
    }
    
    // Ajouter les inspirations de démo
    console.log('Ajout des inspirations de démo...');
    for (const inspiration of demoInspirations) {
      try {
        await createActiveInspiration(inspiration);
        console.log(`✅ Inspiration ajoutée: ${inspiration.title}`);
      } catch (error) {
        console.log(`⚠️  Inspiration déjà existante ou erreur: ${inspiration.title}`);
      }
    }
    
    console.log('🎉 Initialisation des données terminée !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des données:', error);
    throw error;
  }
}

/**
 * Route API pour initialiser les données de démo
 */
export async function initializeDemoData() {
  await seedFirebaseData();
  return {
    success: true,
    message: 'Données de démo initialisées avec succès',
    testimonials: demoTestimonials.length,
    newsletter: demoNewsletterEmails.length,
    blogPosts: demoBlogPosts.length,
    inspirations: demoInspirations.length
  };
}