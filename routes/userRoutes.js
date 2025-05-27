const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

//Hämta controller-funktion som innehåller logik för registering och login.
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

//Hämtar middleware-funktion som kontrollerar giltig JWT.
router.get('/admin', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Skyddad användarprofil', user: req.user });
});

module.exports = router;