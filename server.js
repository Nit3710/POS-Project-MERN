const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();
//connect to the database
connectDB();
//use middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));


const PORT = process.env.PORT || 6000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`server is running on port ${PORT}`);
})