const express = require('express');
const router = express.Router()
const Categoria = require('../models/Categoria');
const db = require('../models/db');

router.get('/', (req, res) => {
    res.render('./admin/index')
})

router.get('/posts', (req, res) => {
    res.send('Pagina de posts')
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