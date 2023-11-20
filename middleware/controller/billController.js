const billModel = require('../models/billModel');

//add items
const addBillsController = async (req, res) => {
    try {
        const newBill = new billModel(req.body);
        await newBill.save();
        res.send({
            message: 'Bill Generated successfully'
        })
    } catch (error) {
        console.log(error);
        res.send({
            error: 'error'
        })

    }
}


module.exports = {  addBillsController};