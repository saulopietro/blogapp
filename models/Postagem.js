const db = require('./db');

const Postagem = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    slug: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.STRING
    }

})

module.exports = Postagem