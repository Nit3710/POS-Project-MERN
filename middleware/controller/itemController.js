const itemModel = require('../models/itemModel');
//get items
const getItemController = async (req, res) => {
    try {
        const items = await itemModel.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};
//add items
const addItemController = async (req, res) => {
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(201).send({
            message: 'item added successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: 'error'
        })

    }
}
//update items
const updateItemController = async (req, res) => {
    try {
        const { itemId } = req.body
        await itemModel.findOneAndUpdate({ _id: itemId }, req.body);
        res.status(201).send({
            message: "Item Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "something went wrong"
        })
    }

}
//delete item
const deleteItemController = async (req, res) => {
    try {
        const { itemId } = req.body
        await itemModel.findOneAndDelete({ _id: itemId })
        res.status(200).send({
            message: 'Item Delete Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'something went wrong'
        })
    }
}
module.exports = { getItemController, addItemController, updateItemController,deleteItemController };