require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../loadModel');
 
const init = async () => {

    // Get the port from the environment variable or default to 8080
    const portVar = process.env.PORT || 8080;
    // Create a server with a host and port
    const server = Hapi.server({
        port: portVar,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    
    // Load the pre-trained model using TensorFlow.js
    const model = await loadModel();
    
    // Attach the model to the server's app object for use in other handlers
    server.app.model = model;
    
    // Register the routes
    server.route(routes);
    
    // Add custom error handling middleware to handle payload content length exceeding 1MB
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
        // Check if the response is a Boom error with status code 413 (Payload Too Large)
        if (response.isBoom && response.output.statusCode === 413)
            // Return a 413 status code and an error message
            return h.response({
                "status": "fail",
                "message": "Payload content length greater than maximum allowed: 1000000"
            }).code(413);
        
        // Continue with the original response
        return h.continue;
    });
    
    // Start the server
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
    
};

// Handle uncaught errors gracefully
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();