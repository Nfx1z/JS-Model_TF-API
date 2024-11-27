require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../loadModel');
 
(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    const model = await loadModel();
    server.app.model = model;
 
    server.route(routes);
 
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
 
        if (response.isBoom && response.output.statusCode === 413) {
            // Custom error message
            const customErrorResponse = {
                "status": "fail",
                "message": "Payload content length greater than maximum allowed: 1000000"
            };

            // Return the custom error with 413 status code
            return h.response(customErrorResponse).code(413);
        }
 
        return h.continue;
    });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
    
})();

// Handle uncaught errors gracefully
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});