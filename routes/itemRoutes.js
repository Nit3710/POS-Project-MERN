const express = require('express');
const { getItemController, addItemController, updateItemController,deleteItemController } = require('../controller/itemController');
const router = express.Router();
//routes using get method
router.get('/get-item', getItemController);
//method using post 
router.post('/add-item', addItemController);
//method using put
router.put('/update-item',updateItemController);
//method using delete
router.delete('/delete-item',deleteItemController);
module.exports = router;