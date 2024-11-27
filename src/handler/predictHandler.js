const predictClassification = require('../controller/predictController');
const crypto = require('crypto');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { isValid, label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }
  if(isValid)
    return h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    }).code(201);

  // Return a 400 status code and an error message
  return h.response({
    status: 'fail',
    message: 'Terjadi kesalahan dalam melakukan prediksi',
  }).code(400);

}
 
module.exports = postPredictHandler;