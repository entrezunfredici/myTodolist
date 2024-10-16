const { DataTypes } = require('sequelize'); // Utiliser DataTypes au lieu de DataTypes

module.exports = (instance) => {
    return instance.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // nom du modèle référencé
                key: 'id'
            }
        },
        todoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'todo', // nom du modèle référencé
                key: 'id'
            }
        },
    })
}