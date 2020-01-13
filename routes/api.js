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
  /* SAMPLE DATA */
  /*
  [
    {
      _id: 1,
      title: "Many parts of Australia are currently facing catastrophic fire conditions",
      description: "The fires have been burning for months, consuming nearly 18 million acres of land, causing thousands to evacuate and killing potentially millions of animals",
      imageUrl: "https://cdn.pixabay.com/photo/2013/08/10/11/04/fire-171229_1280.jpg",
      type: 1
    },
    {
      _id: 2,
      title: "Paragliding accident in Summit County",
      description: "One person was injured after a paragliding accident occurred on Tuesday in Summit County",
      imageUrl: "https://cdn.pixabay.com/photo/2019/12/29/15/45/paragliding-4727377_1280.jpg",
      type: 1
    },
    {
      _id: 3,
      title: "Story3",
      description: "Description",
      imageUrl: "https://cdn.pixabay.com/photo/2013/08/10/11/04/fire-171229_1280.jpg",
      type: 1
    },
    {
      _id: 4,
      title: "Story4",
      description: "Description",
      imageUrl: "https://cdn.pixabay.com/photo/2013/08/10/11/04/fire-171229_1280.jpg",
      type: 2
    },
    {
      _id: 5,
      title: "Story4",
      description: "Description",
      imageUrl: "https://cdn.pixabay.com/photo/2013/08/10/11/04/fire-171229_1280.jpg",
      type: 2
    }
  ]
  */
});

router.use((req, res, next) => {
  if(res.locals.user && res.locals.user.role != 1)
    next(createError(403));
  else next();
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
