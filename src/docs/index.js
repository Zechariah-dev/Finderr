const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { resolve } = require('path');

module.exports = (app) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Finderr API',
                version: '0.1.0',
                description: 'Finderr Server API',
                contact: {
                    name: 'Omolade Sunday',
                    email: 'omoladesunday221@gmail.com'
                }
            },
            components: {
                securitySchemes: {
                    jwt: {
                        type: 'http',
                        scheme: 'bearer',
                        in: 'header',
                        bearerFormat: 'jwt'
                    }
                }
            },
            security: [{ jwt: [] }]
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Server'
            },
            {
                url: 'https://finderr-server.herokuapp.com/',
                description: 'Production Server'
            }
        ],
        tags: [
            {
                name: "Business",
                description: "API Endpoints for business"
            },
            {
                name: "Product",
                description: "API Endpoints for prodduct"
            },


            
            {
                name: "Service",
                description: "API Endpoints for service"
            },
            {
                name: "Auth",
                description: "API Endpoints for authentication"
            }
        ],
        apis: [resolve(__dirname, '../routes/*.js')]
    }
    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}