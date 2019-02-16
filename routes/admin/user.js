var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var passport = require('passport');
var auth = require('connect-ensure-login').ensureLoggedIn;
var Op = Sequelize.Op;

/* GET User Login. */
router.get('/login', async function(req, res, next) {     
    
    res.render('admin/user/login', { title: 'User Login Page' });
    
});

/* GET User Register. */
router.get('/register', async function(req, res, next) {     
    
    res.render('admin/user/register', { title: 'User Register Page' });
    
});

/* Post User Register. */
router.post('/register', function(req, res, next) {  
    
    let formData = req.body;
    
    //hash password
    var saltRount = 10;
    var salt = bcrypt.genSaltSync(saltRount);
    var hash = bcrypt.hashSync(formData.password, salt);
    formData.password = hash;
    console.log(formData);
    console.log('check password');
    models.User.create(formData).then(function(result){
        
        return res.redirect('/user/login');
    }); 
    
});

/* Post Admin login. */
router.post('/login', passport.authenticate('local',{
    successRedirect : '/admin/products',
    failureRedirect : 'login',
    failureFlash : true
}) ,function(req, res, next) { 
    res.redirect('/porducts');
});

router.get('/logout', auth('/user/login'), function(req, res){
    req.logout();
    return res.redirect('/user/login');
})


module.exports = router;
