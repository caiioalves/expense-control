const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.post('/register', UsersController.registerUser);
router.post('/login', UsersController.loginUser);

module.exports = router;