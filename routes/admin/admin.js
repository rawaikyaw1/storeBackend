var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var passport = require('passport');
var auth = require('connect-ensure-login').ensureLoggedIn;
var Op = Sequelize.Op;

/* GET Admin Login. */
router.get('/login', async function(req, res, next) {     
    
    res.render('admin/admin/login', { title: 'Admin Login Page' });
    
});

/* GET Admin Register. */
router.get('/register', async function(req, res, next) {     
    
    res.render('admin/admin/register', { title: 'Admin Register Page' });
    
});

/* Post Admin Register. */
router.post('/register', function(req, res, next) {  
    
    let formData = req.body;
    
    //hash password
    var saltRount = 10;
    var salt = bcrypt.genSaltSync(saltRount);
    var hash = bcrypt.hashSync(formData.password, salt);
    formData.password = hash;
    
    models.Admin.create(formData).then(function(result){
        
        return res.redirect('/login');
    }); 
    
});

/* Post Admin login. */
router.post('/login', passport.authenticate('local',{
    successRedirect : 'products',
    failureRedirect : 'login',
    failureFlash : true
}) ,function(req, res, next) { 
    res.redirect('/porducts');
});

router.get('/logout', auth('/admin/login'), function(req, res){
    req.logout();
    return res.redirect('/login');
})


module.exports = router;
