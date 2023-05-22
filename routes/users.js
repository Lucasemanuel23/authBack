var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/userscontroller')


/* GET users listing. */
router.post('/login', UsersController.ValidaUser);
router.post('/cadastrar', UsersController.CreateUser);

module.exports = router;
