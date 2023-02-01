const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Users = db.define('User', {
    nomeDeUsuário: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Users