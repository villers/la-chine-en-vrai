export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
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
    image: '/images/blog/guide.jpg'
  },
  {
    id: '2',
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
    image: '/images/inspirations/gastronomie.jpg'
  },
  {
    id: '3',
    title: 'Comprendre la philosophie du thé en Chine',
    excerpt: 'Immersion dans l\'art millénaire du thé chinois, ses rituels et sa signification culturelle profonde.',
    content: `
# Comprendre la philosophie du thé en Chine

Le thé en Chine n'est pas qu'une simple boisson, c'est une philosophie de vie, un art qui se transmet de génération en génération.

## L'histoire du thé

### Les origines légendaires
Selon la légende, l'empereur Shen Nung découvrit le thé en 2737 av. J.-C. quand des feuilles tombèrent dans son eau bouillante.

### Évolution historique
- **Tang (618-907)** : Premier traité sur le thé par Lu Yu
- **Song (960-1279)** : Développement de la cérémonie du thé
- **Ming (1368-1644)** : Techniques modernes de production

## Les grandes familles de thé

### Thé vert (绿茶)
- **Longjing** : Délicat et parfumé de Hangzhou
- **Biluochun** : Fruité et floral du Jiangsu
- **Maofeng** : Montagnard et raffiné du Huangshan

### Thé blanc (白茶)
Le plus délicat, séché naturellement au soleil.

### Thé Oolong (乌龙茶)
Semi-fermenté, entre thé vert et thé noir.

### Thé rouge/noir (红茶)
Fermenté, plus corsé et coloré.

### Pu-erh (普洱茶)
Thé post-fermenté du Yunnan, se bonifie avec l'âge.

## La cérémonie du thé (茶道)

### Matériel traditionnel
- **Théière Yixing** en argile pourpre
- **Gaiwan** pour l'infusion
- **Cha Hai** (mer à thé) pour verser
- **Tasses en porcelaine** fine

### Étapes rituelles
1. **Réchauffer** la théière et les tasses
2. **Rincer** les feuilles (première infusion jetée)
3. **Infuser** selon le type de thé
4. **Servir** avec respect et attention

## Philosophie et bien-être

### Les bienfaits
- **Méditation** : Le thé invite à la contemplation
- **Santé** : Antioxydants et propriétés médicinales
- **Social** : Moment de partage et d'échange

### Codes sociaux
- Tapoter la table avec l'index = merci
- Ne jamais remplir sa propre tasse en premier
- Le plus jeune sert le plus âgé

## Où vivre l'expérience du thé

### Maisons de thé traditionnelles
- **Pékin** : Lao She Teahouse
- **Shanghai** : Huxinting Teahouse
- **Chengdu** : People's Park

### Plantations à visiter
- **Hangzhou** : Plantations de Longjing
- **Fujian** : Montagnes de Wuyi
- **Yunnan** : Région de Pu-erh

## Acheter du thé en Chine

### Conseils d'achat
- Privilégier les magasins spécialisés
- Goûter avant d'acheter
- Demander l'origine et l'année de récolte
- Négocier le prix (sauf magasins de luxe)

### Conservation
- Endroit sec et aéré
- À l'abri de la lumière
- Dans des contenants hermétiques

Le thé chinois vous ouvre les portes d'une sagesse millénaire. Prenez le temps de savourer chaque gorgée !
    `,
    author: 'Maître Wang',
    publishedAt: '2024-01-05',
    category: 'Culture',
    tags: ['thé', 'tradition', 'cérémonie', 'philosophie'],
    readingTime: '10 min',
    image: '/images/decorative/calligraphy.jpg'
  },
  {
    id: '4',
    title: 'Road trip sur la Route de la Soie moderne',
    excerpt: 'Partez à la découverte des merveilles du Xinjiang et de la nouvelle Route de la Soie, entre tradition et modernité.',
    content: `
# Road trip sur la Route de la Soie moderne

La Route de la Soie renaît sous nos yeux avec l'initiative Belt and Road. Découvrez ce patrimoine historique revisité par la modernité.

## L'itinéraire classique

### Étape 1 : Xi'an (西安)
**Point de départ historique**
- Armée de Terre Cuite
- Remparts de la ville
- Quartier musulman et Grande Mosquée

### Étape 2 : Dunhuang (敦煌)
**Oasis dans le désert**
- Grottes de Mogao (UNESCO)
- Lac du Croissant de Lune
- Dunes chantantes de Mingsha

### Étape 3 : Turpan (吐鲁番)
**La dépression la plus basse de Chine**
- Ruines de Jiaohe
- Vignobles en terrasses
- Système d'irrigation Karez

### Étape 4 : Urumqi (乌鲁木齐)
**Capitale du Xinjiang**
- Musée du Xinjiang
- Bazar international
- Lac Tianchi (Lac Céleste)

### Étape 5 : Kashgar (喀什)
**Porte vers l'Asie centrale**
- Vieille ville (UNESCO)
- Marché du dimanche
- Mosquée Id Kah

## Transports modernes

### Train rapide
Le nouveau TGV relie désormais Urumqi à Kashgar en 12h au lieu de 24h par la route.

### Autoroutes
L'autoroute G30 traverse tout le corridor, facilitant grandement les déplacements.

### Avion
Liaisons quotidiennes entre les principales villes.

## Cultures et ethnies

### Ouïghours
Peuple turcophone aux traditions riches :
- Architecture islamique
- Artisanat (tapis, couteaux)
- Cuisine aux influences centrasiatiques

### Kazakhs
Nomades traditionnels :
- Élevage de chevaux
- Fauconnerie
- Hospitalité légendaire

### Hans
Majorité chinoise installée récemment :
- Développement économique
- Infrastructures modernes
- Fusion culturelle

## Gastronomie de la Route de la Soie

### Spécialités ouïghoures
- **Polo** : Riz aux carottes et mouton
- **Lagman** : Nouilles étirées à la main
- **Nan** : Pain traditionnel au four tandoor
- **Dapanji** : Poulet aux pommes de terre épicé

### Fruits et produits locaux
- Raisins de Turpan
- Melons de Hami
- Noix et amandes
- Soie naturelle

## Défis et récompenses

### Challenges
- Distances importantes
- Climat extrême (désert/montagne)
- Barrière linguistique
- Différences culturelles

### Récompenses
- Paysages à couper le souffle
- Rencontres authentiques
- Histoire vivante
- Expérience unique

## Conseils pratiques

### Meilleure période
- **Printemps** (avril-mai) : Températures douces
- **Automne** (septembre-octobre) : Récoltes et couleurs

### Préparation
- Permis spéciaux pour certaines zones
- Adaptation progressive à l'altitude
- Vêtements pour tous climats
- Respect des coutumes locales

### Budget
Comptez 15-20 jours pour un voyage complet, avec des coûts variables selon le niveau de confort choisi.

La Route de la Soie moderne offre une expérience unique entre patrimoine millénaire et développement contemporain. Un voyage qui marque à vie !
    `,
    author: 'Explorer Chen',
    publishedAt: '2023-12-28',
    category: 'Voyage',
    tags: ['route de la soie', 'xinjiang', 'culture', 'aventure'],
    readingTime: '12 min',
    image: '/images/inspirations/secrets.jpg'
  },
  {
    id: '5',
    title: 'Témoignage : 3 semaines à découvrir la Chine authentique',
    excerpt: 'Le récit de Sophie, qui a vécu une expérience transformatrice lors de son voyage sur mesure en Chine.',
    content: `
# Témoignage : 3 semaines à découvrir la Chine authentique

*Sophie, 34 ans, cadre parisienne, nous raconte son voyage sur mesure en Chine qui a changé sa vision du monde.*

## L'avant-voyage : entre excitation et appréhension

Quand j'ai décidé de partir en Chine, je ne savais pas vraiment à quoi m'attendre. Les clichés occidentaux, la barrière de la langue, la différence culturelle... Tout me semblait intimidant.

L'équipe de l'agence a su me rassurer et concevoir un itinéraire parfaitement adapté à mes envies : un mélange de grandes villes, de nature et de rencontres authentiques.

## Semaine 1 : L'immersion pékinoise

### Premier choc : la modernité
Arrivée à Pékin, je m'attendais à une ville traditionnelle. Erreur ! La modernité de l'aéroport, du métro et des gratte-ciels m'a immédiatement frappée.

### La Cité Interdite : magique
Malgré la foule, se promener dans ces palais millénaires reste magique. Mon guide local, M. Li, m'a raconté des anecdotes fascinantes sur la vie des empereurs.

### Premier cours de calligraphie
Dans une maison de thé traditionnelle, j'ai appris mes premiers caractères. Quelle concentration cela demande ! J'ai compris pourquoi c'est considéré comme une méditation.

## Semaine 2 : Xi'an et l'Armée de Terre Cuite

### Révélation archéologique
Rien ne peut vous préparer à voir ces milliers de soldats en terre cuite. Chaque visage est unique ! L'histoire prend soudain une dimension très concrète.

### Cours de cuisine
J'ai appris à faire des raviolis chinois avec Madame Zhang. Sa patience et sa bienveillance m'ont touchée. Nous avons échangé en mélangeant chinois, anglais et langage des signes !

### Vélo sur les remparts
Faire le tour des remparts de Xi'an à vélo au coucher du soleil : un moment de pure poésie.

## Semaine 3 : Nature et spiritualité

### Les paysages de Guilin
Les montagnes karstiques de Guilin sortent vraiment d'un rêve. La croisière sur la rivière Li m'a offert des moments de contemplation pure.

### Rencontre avec une famille de pêcheurs
J'ai dormi chez des pêcheurs aux cormorans. Leur mode de vie simple et leur hospitalité m'ont profondément marquée. Malgré la barrière de la langue, nous avons ri ensemble autour d'un repas partagé.

### Temples et méditation
La visite du temple de Nanshan m'a permis de participer à une séance de méditation avec les moines. Une expérience spirituelle intense.

## Ce que ce voyage a changé en moi

### Préjugés brisés
J'ai découvert un peuple chaleureux, curieux et bienveillant. Très loin des clichés véhiculés.

### Ouverture d'esprit
Cette civilisation millénaire m'a appris la patience, le respect des anciens et l'importance des relations humaines.

### Nouveau regard sur la France
Paradoxalement, ce voyage m'a fait redécouvrir ma propre culture. Voir la France à travers les yeux de mes nouveaux amis chinois a été enrichissant.

## Conseils pour futurs voyageurs

### Lâchez prise
N'essayez pas de tout contrôler. Les plus beaux moments surgissent souvent de l'imprévu.

### Apprenez quelques mots
"Ni hao" (bonjour) et "xie xie" (merci) ouvrent toutes les portes et tous les cœurs.

### Goûtez tout
La vraie cuisine chinoise n'a rien à voir avec nos restaurants parisiens. Soyez aventureux !

### Respectez les traditions
Observez et adaptez-vous. Cette attitude vous vaudra respect et amitié.

## Mon conseil final

Ce voyage en Chine ne m'a pas seulement fait découvrir un pays, il m'a transformée. J'ai appris à relativiser, à apprécier l'instant présent et à voir la beauté dans la simplicité.

Si vous hésitez encore, n'hésitez plus. La Chine vous attend avec ses merveilles et ses surprises. Et surtout, faites confiance aux experts qui sauront vous concocter le voyage de votre vie !

*Merci encore à toute l'équipe pour cette expérience inoubliable. Je repars déjà l'année prochaine !*

**Sophie M., voyageuse conquise**
    `,
    author: 'Sophie Martinez',
    publishedAt: '2023-12-20',
    category: 'Témoignage',
    tags: ['témoignage', 'expérience client', 'voyage sur mesure', 'transformation'],
    readingTime: '7 min',
    image: '/images/inspirations/famille.jpg'
  }
];