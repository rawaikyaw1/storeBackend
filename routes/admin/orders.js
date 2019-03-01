var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var auth = require('connect-ensure-login').ensureLoggedIn;
var options = require('../../config/options');
const PDFDocument = require('pdfkit');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET orders listing. */
router.get('/', auth('/user/login'), async function(req, res, next) {     
    
    let orders = await models.Order.findAll({
      include:[
        models.User
      ]
    });

    res.render('admin/orders/index', {title: 'Order Lists', orders:orders, methods:options.PAYMENT_METHOD});
    
});

/* GET orders details. */
router.get('/:id', auth('/user/login'), async function(req, res, next) { 
  id = req.params.id;

  let order = await models.Order.findOne({
    where:{id:id},
    include:[
      models.User
    ]
  });
  
  let order_items = await models.OrderItem.findAll({
    where:{order_id:order.id},
    include:[
      models.Product
    ]
  });

  res.render('admin/orders/details', {title:'Order Details', order:order, order_items:order_items});

});

/* GET orders pdf generate. */
router.get('/pdf/:id', auth('/user/login'), async function(req, res, next) { 
  id = req.params.id;
  const doc = new PDFDocument();
  let filename = 'order';
  filename = encodeURIComponent(filename) + '.pdf';

  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  
  let order = await models.Order.findOne({
    where:{id:id},
    include:[
      models.User
    ]
  });
  
  let order_items = await models.OrderItem.findAll({
    where:{order_id:order.id},
    include:[
      models.Product
    ]
  });

  const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cumque nihil delectus minima itaque consequatur odio fuga, maxime officiis quasi deleniti error pariatur quam molestias sequi recusandae vel voluptates architecto?";

  doc.text('Id')
      .moveTo(50, 20)
      .lineTo(50, 20)
      .stroke();

doc.text('Product Name')
    .moveTo(100, 20)
    .lineTo(50, 20)
    .stroke();

doc.text('Unit Price')
    .moveTo(150, 20)
    .lineTo(150, 20)
    .stroke();

doc.text('Quantity')
    .moveTo(200, 20)
    .lineTo(200, 20)
    .stroke();

doc.text('Sub Total')
    .moveTo(250, 20)
    .lineTo(250, 20)
    .stroke();

  doc.y = 300;
  
  doc.pipe(res);
  doc.end();


});

module.exports = router;
