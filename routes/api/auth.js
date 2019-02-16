var express = require('express');
var router = express.Router();
var models = require('../../models');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var CustomStrategy = require('passport-custom').Strategy;


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


//user login post route.
router.post('/login', function(req, res, next){
    
    passport.authenticate('custom',{session:false},
        (err, user, info)=>{
            if(err || !user){
                return res.status(400).json({
                    message:info || 'Something is not right',
                    user : user
                });
            }

            req.login(user, {session: false}, async(err)=>{
                if(err){res.send(err);}

                const token = jwt.sign(
                    {id:user.id,name:user.name,phone:user.phone},
                    'base64:Cb+iFiV6Iz6Pk1A2rINvWWzqUqzCJ13bXcN1uPXxSSWk=',
                    {

                    });

                    user = await models.User.findOne({where:{id:user.id}});
                    return res.json({user, token});
            });
        }
    )(req, res); //end of passport authenticate

});//end


//user register 
router.post('/register', async function(req, res, next){

    let formData = req.body;
    // console.log(formData);

    //validation

    let userExists = await models.User.findAll({where:{[Op.or]:[{phone: formData.phone},{email: formData.email}]}});

    if(userExists && userExists.langth > 0){
        return res.json({message:'Email address or phone number is already in use'});
    }

    //get salt for password
    var saltRount = 10;
    var salt = bcrypt.genSaltSync(saltRount);
    var hash = bcrypt.hashSync(formData.password, salt);
    formData.password = hash;

    let result = await models.User.create(formData);
    if(result){
        result.passport = null;
        res.json({message:"success", user:result});
    }else{
        res.json({message:"Something went wrong"});
    }

});

router.post("/logout", passport.authenticate('jwt', {session:false}), function(req, res, next){
    req.logout();
    return res.json({success:true, message:"Logout Success"});
});

//Get profile 
router.get("/account", passport.authenticate('jwt', {session: false}),function(req, res, next){
    return res.json({user:req.user});
});

//put profile
router.put('/account', passport.authenticate('jwt', {session: false}), async function(req, res, next){
    let user_id = req.user.id;
    let formData = req.body;

    if(formData.password.length > 5){
        // console.log(formData.password);  

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(formData.password, salt);
        formData.password = hash;

    }else{
        delete formData.password;
    }

    let ok = await models.User.update(formData, {where:{id:user_id}});
    let user = await models.User.findOne({where:{id:user_id}});
        user.password = null;
    return res.json({user:user});

});

module.exports = router;
