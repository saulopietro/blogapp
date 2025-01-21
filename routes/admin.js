const express = require('express');
const router = express.Router()
const Categoria = require('../models/Categoria');
const db = require('../models/db');
const Postagem = require('../models/Postagem');


router.get('/', (req, res) => {
    res.render('./admin/index')
})


router.get('/posts', (req, res) => {
    Postagem.findAll().then((postagens) => {
        const simplePost = postagens.map(postagem => postagem.dataValues)
        res.render('admin/postagens', {postagens: simplePost})
    }).catch((err) => {
        req.flash("error_msg", 'Houve um erro ao listar as postagens')
        res.redirect('/admin/categorias')
    })
})
router.get('/posts/add', (req, res) => { 
    res.render('admin/addpostagens')
})

router.post('/posts/add/novo', (req, res) => { 
    let erros = []

    if(!req.body.titulo || req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({texto: 'Titulo invalido'})
        console.log(erros);
    }
    
    if(!req.body.slug || req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: 'Slug invalido'})
        console.log(erros);
    }

    if(!req.body.descricao || req.body.descricao == undefined || req.body.descricao == null) {
        erros.push({texto: 'Descrição invalida'})
        console.log(erros);
    }
    
    if(!req.body.conteudo || req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({texto: 'Conteúdo invalido'})
        console.log(erros);
    }
    
    if(erros.length > 0) {
        res.render('admin/postagens', {erros: erros})
        
    }else {
        Postagem.create({
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo
        }).then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/posts')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um problema ao salvar a postagem, tente novamente!')
            console.log(err);
        }) 
    }



    console.log(erros);
})

router.get('/posts', (req, res) => {
    Postagem.findAll().then((postagens) => {
        const simplePost = postagens.map(postagem => postagem.dataValues)
        res.render('admin/posts', {postagens: simplePost})
    }).catch((err) => {
        req.flash("error_msg", 'Houve um erro ao listar as postagens')
        res.redirect('/admin/categorias')
    })
})

router.get('/categorias', (req, res) => {
    Categoria.findAll().then((categorias) => {
        const simplePost = categorias.map(categoria => categoria.dataValues)
        res.render('admin/categorias', {categorias : simplePost})
    }).catch((err) => {
        req.flash("error_msg", 'Houve um erro ao listar as categorias')
        res.redirect('/admin/categorias')
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.get('/categorias/delete/:id', (req, res) => {
    Categoria.destroy({where: {'id': req.params.id}})
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')

})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        const onlyCategory = categoria.dataValues
        res.render('admin/editcategorias', {categoria: onlyCategory})
    })
   
})

router.post('/categorias/editar/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        const onlyCategory = categoria.dataValues
        res.render('admin/editcategorias', {categoria: onlyCategory})

        if(onlyCategory.nome == req.body.nome && onlyCategory.slug == req.body.slug) {
            req.flash('error_msg', 'Nenhuma alteração foi feita')
            res.redirect('/admin/categorias')
        } else {
            onlyCategory.nome = req.body.nome
            onlyCategory.slug = req.body.slug

            categoria.save().then(() => {
                req.flash("success_msg", 'A alteração foi feita com sucesso!')
                res.redirect('/admin/categorias')
                console.log(onlyCategory);
            })

        }
    })
})

router.post('/categorias/nova', (req, res) => {

    let erros = []

    if(!req.body.nome || req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome invalido'})
        console.log(erros);
    }
    
    if(!req.body.slug || req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: 'Slug invalido'})
        console.log(erros);
    }

    if(erros.length > 0) {
        res.render('admin/addcategorias', {erros: erros})
    }else {
        Categoria.create({
            nome: req.body.nome,
            slug: req.body.slug,
        }).then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um problema ao salvar a categoria, tente novamente!')
            console.log('Erro ao salvar a categoria!');
        }) 
    }



    console.log(erros);
})
module.exports = router