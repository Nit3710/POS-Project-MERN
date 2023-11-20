const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    verified:{
        type:Boolean
    }
   
}, { timestamp: true });
const Users = mongoose.model('users', userSchema);
module.exports = Users;