const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    return instance.define('postsSubjects', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        todoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts', // nom du modèle référencé
                key: 'id'
            }
        },
        usersId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subjects', // nom du modèle référencé
                key: 'id'
            }
        }
    })
}