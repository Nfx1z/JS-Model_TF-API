const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if not initialized
if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.PROJECT_ID
    });
}
// Initialize Firestore
const db = admin.firestore();

async function saveData(id, result, suggestion, createdAt) {
    try {
        // Save the data to Firestore
        await db.collection(process.env.FIRESTORE_COLLECTION).doc(id).set({
            id,
            result,
            suggestion,
            createdAt
        });
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

module.exports = saveData;