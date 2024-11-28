const predictClassification = require('../controller/predictController');
const saveData = require('../storeData');
const crypto = require('crypto');
 
async function postPredictHandler(request, h) {
	try {
		// Get the image buffer from the request
		const { image } = request.payload;

		// Get the model from the server's application state
		const { model } = request.server.app;
		
		// Perform the prediction and get the result
		const { isValid, label, suggestion } = await predictClassification(model, image);
		const id = crypto.randomUUID();   // Random UUID
		const createdAt = new Date().toISOString();   // Date created
		
		// Create the response data object with the result and other relevant information
		const data = {
			"id": id,
			"result": label,
			"suggestion": suggestion,
			"createdAt": createdAt
		}
		
		// Return a 201 status code and the response data object
		if(isValid){
			await saveData(id, label, suggestion, createdAt);
			return h.response({
				status: 'success',
				message: 'Model is predicted successfully',
				data
			}).code(201);
		}

		// Return a 400 status code and an error message
		return h.response({
			status: 'fail',
			message: 'Terjadi kesalahan dalam melakukan prediksi',
		}).code(400);
	} catch (error) {
		console.error(error);
		// Return a 500 status code and an error message
		return h.response({
			status: 'fail',
			message: error.message,
		}).code(500);
	}
}
 
module.exports = postPredictHandler;