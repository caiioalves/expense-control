const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const User = require('./UsersModel');

const Wallet = db.define('Wallet', {
    Valor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Descrição: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MetodoDePagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.hasMany(Wallet)

module.exports = Wallet
