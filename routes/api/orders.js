var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET orders listing. */
router.get('/', async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    let orders = await models.Order.findAll();
    
    res.json({
      success: true,
      message: 'Api orders retrived successfully!',
      data: orders,
      errors: null
    });
    
  });

module.exports = router;
