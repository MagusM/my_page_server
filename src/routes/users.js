var express = require('express');
var router = express.Router();

const {getUsers, getUserByEmail, dispatchUser, updateUser, saveUser, deleteUser} = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', saveUser);
router.post('/byEmail', getUserByEmail);
router.post('/delete', deleteUser);

module.exports = router;
