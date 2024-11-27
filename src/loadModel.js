const tf = require('@tensorflow/tfjs-node');
 
async function loadModel() {
    try {
        // Load the model from the specified URL
        return await tf.loadGraphModel(process.env.MODEL_URL);
 
    } catch (error) {
        console.error('Error loading model:', error);
        throw error; // Re-throw the error for further handling
    }
}
 
module.exports = loadModel;