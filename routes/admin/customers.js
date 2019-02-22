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

/* GET customers listing. */
router.get('/', auth('/user/login'), async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    let customers = await models.Customer.findAll(
      {
        include:[
          models.Township
        ]
      }
    );
    
    res.render('admin/customer/index', { title: 'Customers', customers:customers });
    
  });

    /* GET customers create page. */
router.get('/create', auth('/user/login'), async function(req, res, next) {     
    
  // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
  let townships = await models.Township.findAll();
  // console.log(townships);
  res.render('admin/customer/create', { title: 'Create New Customer', townships:townships });
  
});

/* Post customers to save. */
router.post('/create', auth('/user/login'), async function(req, res, next) { 
    
  let formData = req.body;

  models.Customer.create(formData).then((err, result)=>{
    
    return res.redirect('/admin/customers');
    
  });

});

   /* GET customers update page. */
 router.get('/:id', auth('/user/login'), async function(req, res, next) {     
  var id = req.params.id;
  
  let customer = await models.Customer.findOne(
   {
     where:{
       id:id
     },
     include:[
       models.Township
     ]
   }
 );

 let townships = await models.Township.findAll();
   
 res.render('admin/customer/update', { title: 'Update Customer', customer:customer, townships:townships });
 
});

 /* POST customers update page. */
 router.post('/:id/update', auth('/user/login'), async function(req, res, next) {     
  var id = req.params.id;
  var formData = req.body;  
 
  models.Customer.update(formData,{where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/customers');
    
  });
 
});

/* Get township to delete. */
router.get('/:id/delete', auth('/user/login'), async function(req, res, next) {     
  var id = req.params.id;
  
  //delete data.
  models.Customer.destroy({where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/customers');
    
  });
 
});

module.exports = router;
