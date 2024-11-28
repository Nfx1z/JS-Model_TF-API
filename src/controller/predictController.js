const tf = require('@tensorflow/tfjs-node');
 
async function predictClassification(model, image) {
  try{
    // Decode the image buffer (this assumes the image is JPEG, you can adjust for other formats)
    let tensor = tf.node.decodeImage(image);
	
    // Check if the image has only one channel (grayscale), and convert to RGB
    if (tensor.shape[2] === 1)
    	tensor = tf.repeat(tensor, 3, -1);  // Repeat the grayscale channel across 3 channels

    // Resize the image to 224x224 pixels, and convert it to a floating-point tensor with 3 channels (RGB)
    tensor = tensor.resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
  
    // Get the prediction result as an array of probabilities
    // The index with the highest value represents the predicted class
    const prediction = await model.predict(tensor).data();

    // Get the label based on the prediction result
    const label = prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';
  
    let suggestion;
    // Set the suggestion based on the predicted label
    if (label === 'Cancer')
       suggestion = "Segera periksa ke dokter!"
    if (label === 'Non-cancer')
       suggestion = "Penyakit kanker tidak terdeteksi."

    // Return the prediction result
    return { isValid: true, label, suggestion };
  }
  // Handle any errors that occur during prediction
  catch (error) {
    console.error('Prediction error:', error);
		
		// Return a 400 status code and an error message
		return {
			isValid: false,
			status: 'fail',
			message: 'Terjadi kesalahan saat memprediksi model.',
		};
	}
}
 
module.exports = predictClassification;