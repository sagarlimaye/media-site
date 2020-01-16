var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const userSchema = require('../schemas/user');
const User = mongoose.model('User', userSchema, 'users');
const newsSchema = require('../schemas/news');
const News = mongoose.model('News', newsSchema, 'news');

router.post('/auth', function(req, res, next) {
  if(req.body && req.body.username && req.body.password) {
    let id = req.body.username;
    let hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    let password = hash.digest('hex');
    User.findOne({ username: id, password: password})
    .then((user) => {
      if(user == null) {
        next(createError(401)); 
      }
      else {
        var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: "10m" });
        res.json(token);
      }
    }).catch(err => next(err));
  }
  else next(createError(400));
});

router.post('/register', (req, res, next) => {
  if(req.body && req.body.password) {
    let hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    req.body.password = hash.digest('hex');
    User.create(req.body).then(() => res.sendStatus(201)).catch(err => (err instanceof mongoose.Error.ValidationError)? next(createError(400, 'There was a problem in your user details. Please check the format and try again.')) : next(err));
  }
  else next(createError(400));
});

router.use('/:path(news|users|user)',function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if(err) {
        if(err.name == "TokenExpiredError")
          next(createError(401));
        else if(err.name=="JsonWebTokenError") next(createError(400))
        else if(err) next(err)
      }
      else {
        res.locals.user = decoded;
        next();
      }
    });
  }
  else next(createError(401));
});

router.get('/news', (req, res, next) => {
  News.find({}).then(news => res.json(news)).catch(err => next(err));
});

router.use((req, res, next) => {
  if(res.locals.user && res.locals.user.role != 1)
    next(createError(403));
  else next();
});

router.post('/addnews',(req,res,next)=>{
  console.log("in router");
  
  var news1 = new News ({story : req.body.story,title : req.body.title, description : req.body.description, imageUrl : req.body.imageUrl, type :req.body.type})
 console.log(news1);
  news1.save(function (error,news) {
    if(error && error instanceof mongoose.Error.ValidationError) next(createError(400));
    
    console.log("news saved");
    if(!error) res.send(news);
  });
});

router.post('/news', (req, res, next) => {
  res.sendStatus(201);
});

router.delete('/news/:id', (req, res, next) => {
  res.sendStatus(204);
});

router.get('/users', (req, res, next) => {
  User.find({}).then(users => res.json(users)).catch(err => next(err));
});
router.delete('/user/:id', (req, res, next) => {
  User.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(done => res.sendStatus(201)).catch(err => (err instanceof mongoose.Error.ValidationError) ? next(createError(400)) : next(err));
});
3
router.use("*", (req, res, next) => next(createError(404)));
module.exports = router;
