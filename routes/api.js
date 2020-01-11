var express = require('express');
var router = express.Router();

router.post('/auth', function(req, res, next) {
  if(req.body && req.body.id && req.body.password) {
    let id = req.body.id;
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

router.get('/news', (req, res, next) => {

});

router.use(function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if(err)
        next(createError(401));
      else next();
    });
  }
  else next(createError(401));
});

router.post('/news', (req, res, next) => {
  
});

router.delete('/news/:id', (req, res, next) => {

});

module.exports = router;
