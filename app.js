require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var models = require('./models');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CustomStrategy = require('passport-custom').Strategy;
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsApiRouter = require('./routes/api/products');
var categoriesApiRouter = require('./routes/api/categories');
var customersApiRouter = require('./routes/api/customers');
var ordersApiRouter = require('./routes/api/orders');
var productsAdminRouter = require('./routes/admin/products');
var categoriesAdminRouter = require('./routes/admin/categories');
var customersAdminRouter = require('./routes/admin/customers');
var ordersAdminRouter = require('./routes/admin/orders');
var townshipsAdminRouter = require('./routes/admin/townships');
var dashboardRouter = require('./routes/admin/dashboard');
var adminLoginRouter = require('./routes/admin/admin');
var userLoginRouter = require('./routes/admin/user');
var authApiRouter = require('./routes/api/auth');



var corsOptions = {
  orgin : 'http://localhost:4200',
  optionsSuccessStatus : 200 
};

var app = express();

//jwt
  var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
//jwt

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'base64:Cb+iFiV6Iz6Pk1A2rINvWWzqUqzCJ13bXcN1uPXxSSWk=';

passport.use(new JwtStrategy(opts, function(jwt_payload, done){

  // console.log('jwt');
  // console.log(jwt_payload);

  models.User.findOne({where:{id:jwt_payload.id}}).then(function(user){
    if(user){
      return done(null, user);
    }else{
      return done(null, false);
      // or you could create a new account.
    }
  })
  .catch(function(err){
    return done(err, false);
  });

}));

//for frontEnd login

passport.use('custom', new CustomStrategy(
  function(req, done){
    //console.log("checking..");
    // do your custom user finding login here , or set to false based on req object.

    models.User.findOne({where:{phone:req.body.phone}}).then((user)=>{
      if(!user){
        
        return done(null, false, 'User no found.');
      }

      //user fond

      if(!bcrypt.compareSync(req.body.password, user.password)){
        console.log('password not match');
        return done(null, false, {message: "Incorrect password"});
      }

      return done(null, user);

    })
    .catch((err)=>{
      console.log(err);
    });
    
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','layouts/admin');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ddddd',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
app.use(cors());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  let info = req.flash("info");
  console.log(info);
  res.locals.flash_info = info;  //variabel 1 khu ka view ka ping chin yin locals thone
  res.locals.flash_success = req.flash("success");
  res.locals.flash_error = req.flash("error");
  res.locals.user = (req.user) ? req.user : null;
  next();
});


app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/api/products', productsApiRouter);
app.use('/api/categories', categoriesApiRouter);
app.use('/api/customers', customersApiRouter);
app.use('/api/orders', ordersApiRouter);
app.use('/api/auth', authApiRouter);

app.use('/admin/products', productsAdminRouter);
// app.use('/admin/products_create', productsAdminRouter);
app.use('/admin/categories', categoriesAdminRouter);
app.use('/admin/customers', customersAdminRouter);
app.use('/admin/orders', ordersAdminRouter);
app.use('/admin/townships', townshipsAdminRouter);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

app.use('/admin/dashboard',dashboardRouter);
app.use('/admin',adminLoginRouter);
app.use('/user',userLoginRouter);


//passport config
passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password'
},
function(email,password,done){
  console.log("checking login...");
  models.User.findOne({where:{email:email}}).then(function(result){
    if(!result) {return done(null,false,{message : 'There is no account associated with this email'})}

    //check if password is correct 
    let yes = bcrypt.compareSync(password,result.password);
    if(yes){
      return done(null,result);
    }else{
      return done(null,false,{message : 'Do not match credential'});
    }
  })
  .catch(function (err){
    if(err) {return done(err);}
  })
}
));

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  console.log("user info accessed");
  models.Admin.findOne({where:{id : id}}).then(function(result){
    if(!result) { return done(null,false);}

    return done(null,result);
  })
  .catch(function(err){
    if(err) {return done(err);}
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.flash_info = req.flash('info');

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
