require('dotenv').config();
const express = require('express');
//const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const usersrouter = require('./routers/users')
app.use('/users', usersrouter)

const todorouter = require('./routers/todo')
app.use('/todo', todorouter)

const usersTodosrouter = require('./routers/usersTodos')
app.use('/usersTodos', usersTodosrouter)

// Options pour SwaggerJsdoc
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API avec OpenAPI et Swagger',
        },
        servers: [
            {
                url: 'http://localhost:9000', // Remplace par l'URL de ton serveur
            },
        ],
    },
    apis: ['./routers/*.js'], // Chemin vers tes fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ... Autres middlewares

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Middleware to validate the request and response against the OpenAPI schema
// app.use(
//     OpenApiValidator.middleware({
//         apiSpec: './openApi.yml',
//         validateResponses: true,
//         ignoreUndocumented: true
//     })
// );

module.exports = app;
