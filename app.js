const express = require('express');
const app = express()
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const usuario = require('./routes/usuario')
const Postagem = require('./models/Postagem');
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Sessão
app.use(session({
    secret: 'blogapp',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
// Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// public
app.use(express.static(path.join(__dirname, 'public')))
// Midleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error = req.flash('error_msg')
    next()
})
//rotas
app.use('/admin', admin)
app.use('/usuario', usuario)

app.get('/', (req, res) => {
    Postagem.findAll().then((postagens) => {
        const simplePost = postagens.map(postagem => postagem.dataValues)
        res.render('index', {postagens: simplePost})
    }).catch((err) => {
        req.flash("error_msg", 'Houve um erro ao listar as postagens')
        res.redirect('/')
    })

})
// Porta
const PORT = 3030
app.listen(PORT, () => {
    console.log('O servidor foi aberto na porta ');
})