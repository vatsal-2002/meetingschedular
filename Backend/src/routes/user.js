const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.post('/signup', user.signUp);

router.post('/login', user.login);

router.patch('/users/:id', authMiddleware.verifyToken, user.updateUser);

router.get('/users/:id', authMiddleware.verifyToken, user.getUserById);

router.delete('/users/:id', authMiddleware.verifyToken, user.deleteUser);

module.exports = router;
