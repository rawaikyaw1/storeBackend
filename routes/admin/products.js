var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var multer  = require('multer');
var fileUpload = multer({ dest: 'public/uploads/products' });
const PER_PAGE = 5;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET products listing. */
router.get('/', async function(req, res, next) { 
  
    var condition = {where:{}, order:[['createdAt', 'DESC']]};
  
    let currentPage = req.query.page ? parseInt(req.query.page) : 1;
    condition.limit = PER_PAGE;
    condition.offset = (currentPage - 1) * PER_PAGE;
    console.log(condition);
    let products = await models.Product.findAndCountAll(condition);

    let pagination = {
      totalRecotds : products.count,
      currentPage : currentPage
    }

    pagination.totalPages = Math.ceil(pagination.totalRecotds/PER_PAGE); //get decimal value to full number.
    pagination.hasNextPage = (pagination.totalPages > 1 && pagination.currentPage < pagination.totalPages) ? (pagination.currentPage + 1) : false;
    pagination.hasPrevPage = (pagination.totalPages > 1 && pagination.currentPage > 1) ? (pagination.currentPage - 1) : false;

    // console.log(pagination);

    // console.log(products);
    res.render('admin/products/products', { title: 'Products', products:products.rows, pagination:pagination });
    
  });
  
  /* GET products create page. */
router.get('/create', async function(req, res, next) {     
    
  // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
  let categories = await models.Category.findAll();
  // console.log(categories);
  res.render('admin/products/product_create', { title: 'Create New Product', categories:categories });
  
});

/* Post products to save. */
router.post('/create', fileUpload.single('thumbnail'), async function(req, res, next) { 
    
  let formData = req.body;

  //save upload file info.
  let photo = req.file;
  if(photo){
    formData.thumbnail = photo.filename;
  }

  models.Product.create(formData).then((err, result)=>{
    
    return res.redirect('/admin/products');
    
  });
});

 /* GET products update page. */
 router.get('/:id', async function(req, res, next) {     
   var id = req.params.id;
   
   let product = await models.Product.findAll(
    {
      where:{
        id:id
      },
      include:[
        models.Category
      ]
    }
  );

  let categories = await models.Category.findAll();
    
  res.render('admin/products/product_update', { title: 'Update Product', product:product, categories:categories });
  
});

 /* POST products update page. */
 router.post('/:id/update',fileUpload.single('thumbnail'), async function(req, res, next) {     
  var id = req.params.id;
  var formData = req.body;
  
  //save upload file info.
  let photo = req.file;
  if(photo){
    formData.thumbnail = photo.filename;
  }

  models.Product.update(formData,{where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/products');
    
  });
 
});

/* Get products to delete. */
router.get('/:id/delete', async function(req, res, next) {     
  var id = req.params.id;
  
  //delete data.

  models.Product.destroy({where:{id:id}}).then((err, result)=>{
    
    return res.redirect('/admin/products');
    
  });
 
});



module.exports = router;
