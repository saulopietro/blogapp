
const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },

    email: {
        type: db.Sequelize.STRING
    },

    isAdmin: {
        type: db.Sequelize.INTEGER,
        defaultValue: 0
    },

    senha: {
        type: db.Sequelize.STRING
    }
})

module.exports = Usuario

