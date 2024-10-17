const { Sequelize } = require('sequelize');
const dbConfig = require('../db.config');

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

const users = require('./users')(instance);
//const todo = require('./todo')(instance);
const todo = require('./todo')(instance);

// Définir les associations


module.exports = {
    instance,
    todo,
    users
};
