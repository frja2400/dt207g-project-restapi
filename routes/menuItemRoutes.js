const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const verifyToken = require('../middleware/verifyToken');

//Hämtar logik från controller för POST, GET, PUT och DELETE
router.get('/', menuItemController.get);
//Dessa är endast för admin, kräver token
router.post('/', verifyToken, menuItemController.create);
router.put('/:id', verifyToken, menuItemController.update);
router.delete('/:id', verifyToken, menuItemController.remove);

module.exports = router;