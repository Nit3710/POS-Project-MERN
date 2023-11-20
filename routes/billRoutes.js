const express = require('express');
const { addBillsController,getBillsController} = require('../controller/billController');
const router = express.Router();

//method using post 
router.post('/add-bills', addBillsController);
router.get('/get-bills',getBillsController)

module.exports = router;