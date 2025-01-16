const Sequelize = require('sequelize');

// Conexão com banco de dados MySQL
const sequelize = new Sequelize('blogapp', 'root', 'swdw1107', {
  host: 'localhost',
  dialect: 'mysql'
});



module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}