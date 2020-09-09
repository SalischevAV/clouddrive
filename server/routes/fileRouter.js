const fileRouter = require('express').Router();
const authMiddleware = require('../middleware/auth');
const fileAPIController = require('../controller/FileAPIController')

fileRouter.post('', authMiddleware, fileAPIController.createDir);
fileRouter.get('', authMiddleware, fileAPIController.getFiles);



module.exports = fileRouter;