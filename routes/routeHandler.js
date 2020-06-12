const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { 
        title: 'Home Page',
        imgs: db.get('imgs').value(),
        skillsets: db.get('skillsets').value(),
        messages: req.flash('info')
    });
})
router.post('/', (req, res) => {
    db.get('posts')
        .push(req.body)
        .write()
    req.flash('info', 'flash is here!')
    setTimeout(() => res.redirect('/'), 3000)
})

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page'});
})
router.post('/login', (req, res) => {
    db.get('users')
        .push(req.body)
        .write()
    res.json({ msg: 'User saved!'})
})

router.get('/admin', (req, res) => {
    res.render('admin', { 
        title: 'Admin Page',
        skillsForm: db.get('skillsForm').value()
    });
})
router.post('/admin/skills', (req, res) => {
    db.get('skills')
        .push(req.body)
        .write()
    res.json({ msg: 'data saved!'})
})
router.post('/admin/upload', (req, res) => {
    console.log(req.body)
    db.get('products')
        .push(req.body)
        .write()
    res.json({ msg: 'data saved!'})
})

module.exports = router