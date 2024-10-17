const { DataTypes } = require('sequelize'); // Utiliser DataTypes au lieu de DataTypes

module.exports = (instance) => {
    return instance.define('usersTodo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        todoid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        usersid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}
