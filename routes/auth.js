const express = require('express');
const {register, login, getCurrentUser, deleteUser} = require('../controllers/auth.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user',getCurrentUser);
router.delete('/user/:id',deleteUser);
module.exports = router