const { addUser } = require('../controllers/userController');
const router = require('express').Router();
const User = require('../models/User');

router.post('/add-user', addUser)

module.exports = router