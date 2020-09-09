const{model, ObjectId, Schema} = require('mongoose');

const FileSchema = new Schema({
    name:{
        type: String,
        required: true,
    }, 
    type:{
        type: String,
        required: true,
    },
    data:{
        type: Date,
        default: Date.now(),
    },
    accessLink:{
        type: String,
    },  
    size:{
        type: Number,
        default: 0,
    }, 
    path:{
        type: String,
        default: '',
    },
    user:{
        type: ObjectId,
        ref: 'User',
    },
    parent:{
        type: ObjectId,
        ref: 'File',
    },
    childs:[{
        type: ObjectId,
        ref: 'File',
    }],
}, {versionKey: false});

module.exports =  model('File', FileSchema);