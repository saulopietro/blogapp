const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');


router.get('/registrar', (req, res) => { 
    res.render('usuarios/registro')
})

const bcrypt = require('bcryptjs');  

router.post('/registrar/novo', async (req, res) => {
    try {
        
        const emailValidation = await Usuario.findOne({where: {email: req.body.email}});

        if (emailValidation) {
            req.flash('error_msg', 'O email já existe');
            return res.redirect('/usuario/registrar');
        }

        if (req.body.senha !== req.body.senha2) {
            req.flash('error_msg', 'As senhas não correspondem');
            return res.redirect('/usuario/registrar');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.senha, salt);

        await Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedPassword,
        });

        req.flash('success_msg', 'Conta criada com sucesso');
        res.redirect('/');

    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Houve um problema ao criar a conta, tente novamente!');
        res.redirect('/registrar');
    }
});

module.exports = router