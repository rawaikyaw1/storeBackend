var express = require('express');
var router = express.Router();
var models = require('../../models');
var passport = require('passport');

// var Sequelize = require('sequelize');
// var jwt = require('jsonwebtoken');
// var Op = Sequelize.Op;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET orders listing. */
// router.get('/', async function(req, res, next) {     
    
//     // var condition = {where:{}, order: [['updatedAt', 'DESC']]};    
    
//     // console.log(condition);
//     let orders = await models.Order.findAll();
    
//     res.json({
//       success: true,
//       message: 'Api orders retrived successfully!',
//       data: orders,
//       errors: null
//     });
    
//   });

router.post('/', passport.authenticate('jwt', {session:false}), async function(req, res, next){

  let fromData = req.body;

  console.log(fromData);

  fromData.customer_id = req.user.id;

  let order = await models.Order.create(fromData);

  fromData.items.map(async (it)=>{
    let product = await models.Product.findOne({where:{id:it.product_id}});

    if(product){
      models.OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        price: product.price,
        qty: it.qty,
        sub_total: it.qty * product.price
      });
    }
  });

  res.json({order:order});

});


module.exports = router;
