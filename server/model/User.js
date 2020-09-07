const  {Schema, model, ObjectId }= require ('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 3,
        max: 12
    },
    diskSpace:{
        type: Number,
        default: 1024**3**10,
    },
    usedSpace:{
        type: Number,
        default: 0,
    },
    avatar:{
        type: String,
    },
    files:[{
        type: ObjectId,
        ref: 'File'
    }]
},{versionKey: false});

module.exports = mongoose.model('User', UserSchema);