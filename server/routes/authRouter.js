const authRouter = require('express').Router();
const authAPIController = require('../controller/authAPIController');
const {check} = require('express-validator');


authRouter.post('/registration',[
    check('email', 'incorrect email').isEmail(),
    check('password', 'password must be longer than 3 and shorter that 12').isLength({min:3, max:12}),
], authAPIController.registration);

authRouter.post('/login',authAPIController.login);


module.exports = authRouter;