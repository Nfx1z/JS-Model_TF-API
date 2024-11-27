const postPredictHandler = require('../handler/predictHandler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  }
  // {
  //   path: '/predict/histories',
  //   method: 'GET',
  //   handler: predictHistoriesHandler,
  // }
]
 
module.exports = routes;