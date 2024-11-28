const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK if not initialized
if(!admin.apps.length) {
    admin.initializeApp({
        // Your Firebase Admin SDK configuration
        credential: admin.credential.applicationDefault(),
        projectId: process.env.PROJECT_ID
    });
}

// Initialize Firestore
const db = admin.firestore();

// Fetch all documents from the 'predictions' collection
async function fetchAllPredictions() {
    try {
        // Get a reference to the collection
        const predictionsCollection = db.collection(process.env.FIRESTORE_COLLECTION);
        // Get all documents in the collection
        const snapshot = await predictionsCollection.get();

        // Check if any documents were found
        if (snapshot.empty) 
            return { messages: 'No data found' }.code(404);
        
        // Extract data from each document
        const responseData = [];
        snapshot.forEach(doc => {
            responseData.push({ id: doc.id, ...doc.data() }); // Include document ID in the data
        });

        return {
            status: 'success',
            data: responseData
        }; // Return all documents' data as an array
    } catch (error) {
        // Handle errors
        console.error('Error fetching data: ', error);
        return { 
            status: 'fail',
            error: 'Unable to fetch data' 
        };
    }
}


module.exports = fetchAllPredictions;
