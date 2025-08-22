/**
 * Script pour initialiser les données de démo
 * Usage: node src/scripts/seed-data.js
 */

const dotenv = require('dotenv');

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: '.env.local' });

async function seedData() {
  try {
    console.log('🌱 Initialisation des données de démo...');
    
    // Import dynamique pour éviter les problèmes avec ES modules
    const { seedFirebaseData } = await import('../lib/firebase/seedData.js');
    
    await seedFirebaseData();
    
    console.log('🎉 Données de démo initialisées avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des données:', error);
    process.exit(1);
  }
}

seedData();