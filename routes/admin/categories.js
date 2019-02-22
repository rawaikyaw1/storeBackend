var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var auth = require('connect-ensure-login').ensureLoggedIn;


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET categories listing. */
router.get('/', auth('/user/login'), async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    let categories = await models.Category.findAll();
    
    res.render('admin/category/index', { title: 'Categories', categories:categories });
    
  });

   /* GET category create page. */
router.get('/create', auth('/user/login'), async function(req, res, next) {     
  
  res.render('admin/category/create', { title: 'Create New Categories' });
  
});

/* Post category to save. */
router.post('/create', auth('/user/login'), async function(req, res, next) { 
    
  let formData = req.body;

  models.Category.create(formData).then((err, result)=>{
    
    return res.redirect('/admin/categories');
    
  });

});

/* GET category update page. */
router.get('/:id', auth('/user/login'), async function(req, res, next) {     
  var id = req.params.id;
  
  let category = await models.Category.findOne(
   {
     where:{
       id:id
     }
   }
 );
   
 res.render('admin/category/update', { title: 'Update Category', category:category });
 
});

/* Post category update Data. */
router.post('/:id/update', auth('/user/login'), async function(req, res, next) {     
  var id = req.params.id;
  var formData = req.body;

  models.Category.update(formData,{where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/categories');
    
  });   
 
});

/* Get category to delete. */
router.get('/:id/delete', auth('/user/login'), async function(req, res, next) {     
  var id = req.params.id;
  
  //delete data.
  models.Category.destroy({where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/categories');
    
  });
 
});

module.exports = router;
