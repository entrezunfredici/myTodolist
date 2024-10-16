const { Sequelize } = require('sequelize');
const dbConfig = require('../db.config');

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

const users = require('./users')(instance);
const todo = require('./todo')(instance);
const userstodo = require('./userstodo')(instance);
//const comments = require('./comments')(instance);

// Définir les associations


module.exports = {
    instance,
    users,
    todo,
    userstodo,
};
