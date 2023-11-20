const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const itemModel = require('./models/itemModel');
const items = require('./utils/data');
//config
dotenv.config();
connectDB();
//seeder function
const importData = async () => {
    try {
        await itemModel.deleteMany();
        const itemsdata = await itemModel.insertMany(items);
        console.log(itemsdata);
        console.log("all items added successfully");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
importData();