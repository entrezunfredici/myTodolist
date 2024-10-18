const { Sequelize } = require('sequelize');
const dbConfig = require('../db.config');

const instance = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

const users = require('./users')(instance);
const todos = require('./todo')(instance);
const usersTodos = require('./usersTodos')(instance);
// Définir les associations
users.hasMany(usersTodos, { foreignKey: 'userId' });
usersTodos.belongsTo(users, { foreignKey: 'userId' });

todos.hasMany(usersTodos, { foreignKey: 'todosId' });
usersTodos.belongsTo(todos, { foreignKey: 'todosId' });

module.exports = {
    instance,
    todos,
    users,
    usersTodos
};
