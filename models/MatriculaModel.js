const Sequelize = require('sequelize');
const database = require('../database/db');
 
const Matricula = database.define('matricula', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    },
    escolaridade: Sequelize.STRING
})
 
module.exports = Matricula;