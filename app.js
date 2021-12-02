const express = require('express')
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
})
);
//Need to check which route to take for logged in user...
/*app.use('/private', (req,res,next) => {
  //console.log(req.session.id);
  if(!req.session.user){
      //return res.redirect('/');
      //res.status(403).render('users/notauthenticated', {title: "Error"});
      res.status(403).json({error:"Not authenticated"});
  }else{
      next();
  }
});*/
/*
app.use('/broadband/newPlan', (req,res,next) => {
  if(req.session.user){
    if(req.session.user.userName === 'admin'){
      res.redirect('/broadband/newPlan');
    }
    else{
      res.redirect('/')
    }
  }
  else{
    res.redirect('/')
  }
});*/

app.use('/users/login' , (req,res,next) => {
  if(req.session.user){
    res.redirect('/');
  }
  else{
    next();
  }
})

app.use('/users/signup' , (req,res,next) => {
  if(req.session.user){
    res.redirect('/');
  }
  else{
    next();
  }
});


app.use('/users/profile', (req,res,next) => {
  if(!req.session.user){
    res.redirect('/');
  }
  else{
    next();
  }
});


app.use('/users/logout', (req,res,next) => {
  if(!req.session.user){
    res.redirect('/');
  }
  else{
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });
