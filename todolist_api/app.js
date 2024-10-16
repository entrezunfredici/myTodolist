require('dotenv').config();
const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const usersrouter = require('./routers/users')
app.use('/users', usersrouter)

// Middleware to validate the request and response against the OpenAPI schema
// app.use(
//     OpenApiValidator.middleware({
//         apiSpec: './openApi.yml',
//         validateResponses: true,
//         ignoreUndocumented: true
//     })
// );

module.exports = app;
