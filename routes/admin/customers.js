var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET customers listing. */
router.get('/', async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    let customers = await models.Customer.findAll();
    
    res.json({
      success: true,
      message: 'Admin customers retrived successfully!',
      data: customers,
      errors: null
    });
    
  });

module.exports = router;
