const db = require('./db')

const Categoria = db.sequelize.define('categorias', {
    nome: {
        type: db.Sequelize.STRING
    },
    slug: {
        type: db.Sequelize.STRING 
    },
    date: {
        type: db.Sequelize.DATE,
    }
})

module.exports = Categoria