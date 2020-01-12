var express = require('express');
var router = express.Router();
const createError = require('http-errors');

router.use('/auth', function(req, res, next) {
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
        var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: "1h" });
        res.json(token);
      }
    }).catch(err => next(err));
  }
  else next(createError(400));
});

router.post('register', (req, res, next) => {
  if(req.body) {
    let hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    req.body.password = hash.digest('hex');
    User.create(req.body).then(() => res.sendStatus(201)).catch(err => next(err));
  }
  else next(createError(400));
});

router.use(function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if(err)
        next(err);
      else {
        res.locals.user = decoded;
        next();
      }
    });
  }
  else next(createError(401));
});

router.get('/news', (req, res, next) => {

});

router.use((req, res, next) => {
  if(res.locals.user && res.locals.user.role != 1)
    next(createError(401));
  else next();
});

router.post('/news', (req, res, next) => {
  
});

router.delete('/news/:id', (req, res, next) => {

});

module.exports = router;
