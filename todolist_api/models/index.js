const { Sequelize } = require('sequelize');
const dbConfig = require('../db.config');

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

//définir les moddèles :
const users = require('./users')(instance);
const todo = require('./todo')(instance);
const userstodo = require('./userstodo')(instance);
// Définir les associations :
userstodo.hasMany(users, {foreignKey: 'userId'});
users.belongsTo(userstodo, { foreignKey: 'userId'});
userstodo.hasMany(todo, {foreignKey: 'todoId'})
todo.belongsTo(userstodo, { foreignKey: 'todoId'});

module.exports = {
    instance,
    users,
    todo,
    userstodo
};
