let express = require('express');


var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.send('index loaded');
});

module.exports = indexRouter;
