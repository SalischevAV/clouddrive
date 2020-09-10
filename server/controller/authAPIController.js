const User = require('../model/User');
const config = require('config')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const fileService = require('../services/FileService');
const File = require('../model/File');


module.exports.registration =async (req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400)
                    .json({message: 'Invalid email or password', errors});
        }

        const {email, password} = req.body;
        const candidate =await User.findOne({email});

        if(candidate){
            return res.status(400)
                    .json({message: `User with email ${email} already exist`});
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const user = new User({email, password: hashPassword});
        await user.save();
        await fileService.createDir(new File({user:user._id, name:''}));
        return res.status(201)
                .json({message:'User was created'});

    }
    catch(err){
        console.log('Registration error: ', err);
        res.send({message: 'Server error'});
    }
}

module.exports.login =async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404)
                    .json({message: 'User not found'});
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if(!isPassValid){
            return res.status(400)
                    .json({message: 'Password incorrect'});
        }

        const token = jwt.sign({id:user.id}, config.get('secretKey'), {expiresIn: '1h'});
        return res.status(200)
                .json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        diskSpace: user.diskSpace,
                        usedSpace: user.usedSpace,
                        avatar: user.avatar,
                    }
                })

    }
    catch(err){
        console.log('Registration error: ', err);
        res.send({message: 'Server error'});
    }
}

module.exports.auth =async (req, res)=>{
    
    try{
        const user = await User.findById(req.user.id);
        const token = jwt.sign({id:user.id}, config.get('secretKey'), {expiresIn: '1h'});
        return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        diskSpace: user.diskSpace,
                        usedSpace: user.usedSpace,
                        avatar: user.avatar,
                    }
                })

    }
    catch(err){
        console.log('Auth error: ', err);
        res.send({message: 'Auth error(controller)'});
    }
}