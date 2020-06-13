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
    res.redirect('/')
})

router.get('/login', (req, res) => {
    console.log(req.session)
    res.render('login', { title: 'Login Page'});
})
router.post('/login', (req, res) => {
    db.get('users')
        .push(req.body)
        .write()
    req.session.isLogged = true
    res.redirect('/admin')
})

router.all('/admin*', requireLogin, (req, res, next) => {
    next(); 
});
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
    db.get('products')
        .push(req.body)
        .write()
    res.json({ msg: 'data saved!'})
})

function requireLogin(req, res, next) {
    if (req.session.isLogged) {
        next(); 
    } else {
        res.redirect("/login"); 
    }
}

module.exports = router