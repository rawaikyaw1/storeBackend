var express = require('express');
var router = express.Router();
var models = require('../../models');
var passport = require('passport');
var options = require('../../config/options');

// var Sequelize = require('sequelize');
// var jwt = require('jsonwebtoken');
// var Op = Sequelize.Op;

/* GET users listing. */
router.get('/',async function(req, res, next) {
  
  let orders = await models.Order.findAll({
    include:[
      models.User
    ]});

  let statuses = options.ORDER_STATUS;
  let methods = options.PAYMENT_METHOD;

  orders.map((order,i)=>{
    order.status = statuses[order.status];
    order.payment_method = methods[order.payment_method];
  });

    console.log(orders);
  res.json({orders:orders});

});

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


router.get('/:id', passport.authenticate('jwt', {session:false}), async function(req, res, next){
  let user_id = req.user.id;
  let id = req.params.id;
  let order = await models.Order.findOne({where:{id:id}});

  if(user_id != order.customer_id){
    res.json({error:"You do not have permission to view this orders"});
  }

  let OrderItems = await models.OrderItem.findAll({
    where:{
      order_id:order.id
    },
    include:[models.Product]
  });

  res.json({order:order,items:OrderItems});

});


module.exports = router;
