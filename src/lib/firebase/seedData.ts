import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

const sampleTestimonials = [
  {
    name: "Marie Dubois",
    location: "Paris",
    text: "Un voyage extraordinaire ! L'équipe a su nous faire découvrir une Chine authentique, loin des clichés touristiques. Les guides locaux étaient exceptionnels et leur connaissance du pays nous a permis de vivre des expériences uniques. Je recommande vivement cette agence pour tous ceux qui souhaitent découvrir la vraie Chine.",
    rating: 5,
    travelType: "Culture & Histoire",
    travelDate: "2024-03",
    isVerified: true,
    isPublished: true,
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    name: "Pierre et Sophie Martin",
    location: "Lyon",
    text: "Notre lune de miel en Chine était magique. Chaque détail était parfaitement organisé, nous n'avions qu'à profiter de chaque moment. Les paysages de Guilin nous ont coupé le souffle, et la découverte de Shanghai nous a émerveillés. Un voyage romantique inoubliable !",
    rating: 5,
    travelType: "Voyage romantique",
    travelDate: "2024-02",
    isVerified: true,
    isPublished: true,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    name: "Famille Rousseau",
    location: "Bordeaux",
    text: "Voyager en Chine avec nos enfants semblait compliqué, mais l'équipe a rendu cela simple et inoubliable. Nos enfants en parlent encore ! Les activités étaient adaptées à tous les âges et nous avons tous appris énormément sur cette culture fascinante.",
    rating: 5,
    travelType: "Voyage familial",
    travelDate: "2024-01",
    isVerified: true,
    isPublished: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    name: "Jean-Claude Moreau",
    location: "Toulouse",
    text: "Une expérience culinaire extraordinaire ! En tant que chef, j'étais curieux de découvrir la vraie cuisine chinoise. Ce voyage a dépassé toutes mes attentes. Chaque région visitée nous a révélé des saveurs nouvelles et des techniques millénaires. Inspirant !",
    rating: 5,
    travelType: "Gastronomie",
    travelDate: "2023-11",
    isVerified: true,
    isPublished: true,
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    name: "Amélie Leclerc",
    location: "Nantes",
    text: "Les paysages du Yunnan sont à couper le souffle ! Notre guide nous a menés hors des sentiers battus pour découvrir des villages authentiques et rencontrer les minorités locales. Une aventure humaine et naturelle exceptionnelle.",
    rating: 4,
    travelType: "Nature & Paysages",
    travelDate: "2023-10",
    isVerified: true,
    isPublished: true,
    createdAt: new Date('2023-11-12'),
    updatedAt: new Date('2023-11-12'),
  },
  {
    name: "Thomas Dubois",
    location: "Marseille",
    text: "Mon premier voyage en Chine et certainement pas le dernier ! L'organisation était parfaite, les hébergements de qualité et surtout, j'ai pu découvrir la Chine moderne tout en appréciant ses traditions anciennes. Équilibre parfait !",
    rating: 5,
    travelType: "Circuit sur mesure",
    travelDate: "2023-09",
    isVerified: true,
    isPublished: true,
    createdAt: new Date('2023-10-08'),
    updatedAt: new Date('2023-10-08'),
  }
];

export async function seedTestimonials() {
  try {
    console.log('🌱 Seeding testimonials data...');
    
    for (const testimonial of sampleTestimonials) {
      await addDoc(collection(db, 'testimonials'), testimonial);
      console.log(`✅ Added testimonial by ${testimonial.name}`);
    }
    
    console.log('🎉 Testimonials seeding completed!');
    return true;
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    throw error;
  }
}

// Fonction pour réinitialiser les données (optionnel)
export async function clearTestimonials() {
  try {
    // Cette fonction nécessiterait d'importer deleteDoc et getDocs
    // et de supprimer tous les documents existants
    console.log('🧹 Clearing testimonials...');
    // Implementation would go here
  } catch (error) {
    console.error('❌ Error clearing testimonials:', error);
    throw error;
  }
}