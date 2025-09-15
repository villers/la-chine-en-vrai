/**
 * Script pour initialiser les données de démo
 * Usage: node src/scripts/seed-data.js
 */

const dotenv = require('dotenv');
const admin = require('firebase-admin');

// Charger les variables d'environnement depuis .env.prod
dotenv.config({ path: '.env.prod' });

// Configuration Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialiser Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function seedData() {
  try {
    console.log('🌱 Initialisation des données de démo...');

    // Vérifier les variables d'environnement
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      throw new Error('Variables d\'environnement Firebase manquantes dans .env.prod');
    }

    console.log('🔧 Configuration Firebase:');
    console.log('- Project ID:', process.env.FIREBASE_ADMIN_PROJECT_ID);
    console.log('- Client Email:', process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
    console.log('- Private Key:', process.env.FIREBASE_ADMIN_PRIVATE_KEY ? '✅ Présente' : '❌ Manquante');

    // Import dynamique depuis le fichier compilé ou utilisation directe
    let seedFirebaseData;
    try {
      // Essayer d'importer depuis le fichier TypeScript compilé
      const seedModule = require('../lib/firebase/seedData.ts');
      seedFirebaseData = seedModule.seedFirebaseData;
    } catch (error) {
      console.log('⚠️  Import TypeScript échoué, création des données directement avec Firebase Admin...');

      // Utiliser Firebase Admin SDK directement
      const db = admin.firestore();

      // Données de témoignages
      const testimonials = [
        {
          name: 'Sophie Martinez',
          location: 'Paris, France',
          text: 'Un voyage absolument extraordinaire ! L\'équipe a su créer un itinéraire parfaitement adapté à nos envies.',
          rating: 5,
          travelType: 'Voyage sur mesure',
          travelDate: '2024-03-15',
          isVerified: true,
          isPublished: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          avatar: '/images/avatars/woman1.jpg'
        },
        {
          name: 'Marc Dubois',
          location: 'Lyon, France',
          text: 'Excellente organisation du voyage. Les guides locaux étaient passionnants.',
          rating: 5,
          travelType: 'Gastronomie & Culture',
          travelDate: '2024-02-20',
          isVerified: true,
          isPublished: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          avatar: '/images/avatars/man1.jpg'
        },
        {
          name: 'Claire & Thomas',
          location: 'Bordeaux, France',
          text: 'Notre lune de miel en Chine restera inoubliable. De la Grande Muraille aux rizières de Guilin, chaque moment était magique.',
          rating: 5,
          travelType: 'Voyage de noces',
          travelDate: '2024-01-10',
          isVerified: true,
          isPublished: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          avatar: '/images/avatars/couple1.jpg'
        }
      ];

      // Créer les témoignages
      for (const testimonial of testimonials) {
        try {
          const docRef = await db.collection('testimonials').add(testimonial);
          console.log(`✅ Témoignage créé: ${testimonial.name} (ID: ${docRef.id})`);
        } catch (err) {
          console.log(`⚠️  Erreur pour ${testimonial.name}:`, err.message);
        }
      }

      // Créer quelques inspirations
      const inspirations = [
        {
          categoryId: 'gastronomie',
          title: 'Gastronomie & Saveurs',
          description: 'Un voyage culinaire à travers les 8 grandes cuisines chinoises',
          image: '/images/inspirations/gastronomie.jpg',
          order: 1,
          isActive: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          itineraries: [
            {
              title: 'Route des Saveurs du Sichuan',
              duration: '10 jours',
              highlights: ['Chengdu', 'Leshan', 'Emeishan'],
              description: 'Découvrez la cuisine épicée du Sichuan.',
              price: 'À partir de 2 200€'
            }
          ]
        }
      ];

      for (const inspiration of inspirations) {
        try {
          const docRef = await db.collection('inspirations').add(inspiration);
          console.log(`✅ Inspiration créée: ${inspiration.title} (ID: ${docRef.id})`);
        } catch (err) {
          console.log(`⚠️  Erreur pour ${inspiration.title}:`, err.message);
        }
      }

      console.log('🎉 Données créées directement !');
      process.exit(0);
      return;
    }

    await seedFirebaseData();

    console.log('🎉 Données de démo initialisées avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des données:', error);
    process.exit(1);
  }
}

seedData();