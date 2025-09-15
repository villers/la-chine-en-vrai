/**
 * Script pour gérer les utilisateurs admin
 * Usage: 
 *   node src/scripts/manage-admin.js create <email>    - Créer un utilisateur admin
 *   node src/scripts/manage-admin.js grant <uid>       - Donner les droits admin à un utilisateur existant
 *   node src/scripts/manage-admin.js revoke <uid>      - Retirer les droits admin
 *   node src/scripts/manage-admin.js list              - Lister tous les utilisateurs avec leur statut admin
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

// Créer un utilisateur admin
async function createAdmin(email) {
  try {
    // Vérifier les variables d'environnement
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      throw new Error('Variables d\'environnement Firebase manquantes dans .env.prod');
    }

    console.log('🔧 Configuration Firebase:');
    console.log('- Project ID:', process.env.FIREBASE_ADMIN_PROJECT_ID);
    console.log('- Client Email:', process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
    console.log('- Private Key:', process.env.FIREBASE_ADMIN_PRIVATE_KEY ? '✅ Présente' : '❌ Manquante');

    const auth = admin.auth();
    
    console.log(`👤 Création de l'utilisateur admin: ${email}`);
    
    // Vérifier si l'utilisateur existe déjà
    let user;
    try {
      user = await auth.getUserByEmail(email);
      console.log(`✅ Utilisateur existant trouvé: ${user.uid}`);
    } catch (error) {
      // Créer l'utilisateur
      user = await auth.createUser({
        email: email,
        password: 'AdminTemp123!', // Mot de passe temporaire
        emailVerified: true,
        displayName: 'Administrateur'
      });
      console.log(`✅ Utilisateur créé: ${user.uid}`);
      console.log(`🔑 Mot de passe temporaire: AdminTemp123!`);
      console.log(`⚠️  Pensez à changer le mot de passe lors de la première connexion`);
    }
    
    // Accorder les droits admin
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Droits admin accordés à ${email}`);
    
    // Vérifier
    const updatedUser = await auth.getUser(user.uid);
    console.log('📋 Claims actuels:', updatedUser.customClaims);

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur admin:', error);
    process.exit(1);
  }
}

// Donner les droits admin à un utilisateur existant
async function grantAdmin(uid) {
  try {
    // Vérifier les variables d'environnement
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      throw new Error('Variables d\'environnement Firebase manquantes dans .env.prod');
    }

    const auth = admin.auth();
    
    // Vérifier que l'utilisateur existe
    const user = await auth.getUser(uid);
    console.log(`✅ Utilisateur trouvé: ${user.email || user.uid}`);
    
    // Accorder les droits admin
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log(`✅ Droits admin accordés à l'utilisateur ${uid}`);

    // Vérifier
    const updatedUser = await auth.getUser(uid);
    console.log('📋 Claims actuels:', updatedUser.customClaims);

  } catch (error) {
    console.error('❌ Erreur lors de l\'octroi des droits admin:', error);
    process.exit(1);
  }
}

// Retirer les droits admin
async function revokeAdmin(uid) {
  try {
    // Vérifier les variables d'environnement
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      throw new Error('Variables d\'environnement Firebase manquantes dans .env.prod');
    }

    const auth = admin.auth();
    
    // Vérifier que l'utilisateur existe
    const user = await auth.getUser(uid);
    console.log(`✅ Utilisateur trouvé: ${user.email || user.uid}`);
    
    // Retirer les droits admin
    await auth.setCustomUserClaims(uid, { admin: false });
    console.log(`✅ Droits admin retirés à l'utilisateur ${uid}`);

    // Vérifier
    const updatedUser = await auth.getUser(uid);
    console.log('📋 Claims actuels:', updatedUser.customClaims);

  } catch (error) {
    console.error('❌ Erreur lors du retrait des droits admin:', error);
    process.exit(1);
  }
}

// Lister tous les utilisateurs
async function listUsers() {
  try {
    // Vérifier les variables d'environnement
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      throw new Error('Variables d\'environnement Firebase manquantes dans .env.prod');
    }

    const auth = admin.auth();
    
    console.log('📋 Liste des utilisateurs:\n');
    
    const listUsersResult = await auth.listUsers();
    
    if (listUsersResult.users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé');
      return;
    }
    
    listUsersResult.users.forEach((user, index) => {
      console.log(`👤 Utilisateur ${index + 1}:`);
      console.log(`   UID: ${user.uid}`);
      console.log(`   Email: ${user.email || 'Non défini'}`);
      console.log(`   Nom: ${user.displayName || 'Non défini'}`);
      console.log(`   Email vérifié: ${user.emailVerified ? '✅' : '❌'}`);
      console.log(`   Créé le: ${user.metadata.creationTime}`);
      console.log(`   Claims personnalisés:`, user.customClaims || 'Aucun');
      console.log(`   Statut admin: ${user.customClaims?.admin ? '✅ Admin' : '❌ Utilisateur normal'}`);
      console.log('---');
    });
    
    console.log(`\n📊 Total: ${listUsersResult.users.length} utilisateur(s)`);

  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs:', error);
    process.exit(1);
  }
}

// Fonction principale
async function main() {
  const [command, identifier] = process.argv.slice(2);
  
  if (!command) {
    console.log(`
📚 Script de gestion des administrateurs

Usage:
  node src/scripts/manage-admin.js create <email>    - Créer un utilisateur admin
  node src/scripts/manage-admin.js grant <uid>       - Donner les droits admin à un utilisateur existant
  node src/scripts/manage-admin.js revoke <uid>      - Retirer les droits admin
  node src/scripts/manage-admin.js list              - Lister tous les utilisateurs

Exemples:
  node src/scripts/manage-admin.js create admin@chine-en-vrai.com
  node src/scripts/manage-admin.js grant abc123def456
  node src/scripts/manage-admin.js revoke abc123def456
  node src/scripts/manage-admin.js list
    `);
    process.exit(1);
  }
  
  try {
    switch (command) {
      case 'create':
        if (!identifier) {
          console.log('❌ Email requis pour la création');
          process.exit(1);
        }
        await createAdmin(identifier);
        break;
        
      case 'grant':
        if (!identifier) {
          console.log('❌ UID requis pour accorder les droits admin');
          process.exit(1);
        }
        await grantAdmin(identifier);
        break;
        
      case 'revoke':
        if (!identifier) {
          console.log('❌ UID requis pour retirer les droits admin');
          process.exit(1);
        }
        await revokeAdmin(identifier);
        break;
        
      case 'list':
        await listUsers();
        break;
        
      default:
        console.log(`❌ Commande inconnue: ${command}`);
        console.log('Commandes disponibles: create, grant, revoke, list');
        process.exit(1);
    }

    console.log('🎉 Opération terminée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution:', error);
    process.exit(1);
  }
}

main();