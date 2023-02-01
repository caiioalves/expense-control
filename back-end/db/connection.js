const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: process.env.MYSQL_PORT
});

try {
    sequelize.authenticate();
    console.log('Sucesso ao conectar');
} catch(error) {
    console.log('Erro ao conectar', error);
}

module.exports = sequelize