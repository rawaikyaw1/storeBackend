var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var auth = require('connect-ensure-login').ensureLoggedIn;
var Op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET products listing. */
router.get('/', auth('/user/login'), async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    // let products = await models.Product.findAndCountAll();
    
    res.render('admin/dashboard', { title: 'Dashboard' });
    
  });

module.exports = router;
