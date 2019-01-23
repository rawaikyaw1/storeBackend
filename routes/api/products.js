var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET products listing. */
router.get('/', async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    let products = await models.Product.findAndCountAll();
    
    res.json({
      success: true,
      message: 'Api Products retrived successfully!',
      data: products,
      errors: null
    });
    
  });

module.exports = router;
