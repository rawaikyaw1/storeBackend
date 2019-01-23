var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var multer  = require('multer');
var fileUpload = multer({ dest: 'public/uploads/products' });

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET products listing. */
router.get('/', async function(req, res, next) {     
    
    let products = await models.Product.findAll(
      {
        include:[
          models.Category
        ]
      }
    );
    // console.log(products);
    res.render('admin/products', { title: 'Products', products:products });
    
  });
  
  /* GET products create page. */
router.get('/create', async function(req, res, next) {     
    
  // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
  let categories = await models.Category.findAll();
  console.log(categories);
  res.render('admin/product_create', { title: 'Create New Product', categories:categories });
  
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



module.exports = router;
