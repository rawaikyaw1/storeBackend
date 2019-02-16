var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET townships listing. */
router.get('/', async function(req, res, next) {     
    
    // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
    // console.log(condition);
    let townships = await models.Township.findAll();
    
    res.render('admin/township/index', { title: 'Townships', townships:townships });
    
  });

   /* GET township create page. */
router.get('/create', async function(req, res, next) {     
  
  res.render('admin/township/create', { title: 'Create New Township' });
  
});

/* Post category to save. */
router.post('/create', async function(req, res, next) { 
    
  let formData = req.body;

  models.Township.create(formData).then((err, result)=>{
    
    return res.redirect('/admin/townships');
    
  });

});

/* GET township update page. */
router.get('/:id', async function(req, res, next) {     
  var id = req.params.id;
  
  let township = await models.Township.findOne(
   {
     where:{
       id:id
     }
   }
 );
   
 res.render('admin/township/update', { title: 'Update Township', township:township });
 
});

/* Post township update Data. */
router.post('/:id/update', async function(req, res, next) {     
  var id = req.params.id;
  var formData = req.body;

  models.Township.update(formData,{where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/townships');
    
  });   
 
});

/* Get township to delete. */
router.get('/:id/delete', async function(req, res, next) {     
  var id = req.params.id;
  
  //delete data.
  models.Township.destroy({where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/townships');
    
  });
 
});

module.exports = router;
