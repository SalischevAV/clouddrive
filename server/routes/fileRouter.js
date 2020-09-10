const fileRouter = require('express').Router();
const authMiddleware = require('../middleware/auth');
const fileAPIController = require('../controller/FileAPIController')

fileRouter.post('', authMiddleware, fileAPIController.createDir);
fileRouter.post('/upload', authMiddleware, fileAPIController.uploadFile);
fileRouter.get('', authMiddleware, fileAPIController.getFiles);
fileRouter.get('/download', authMiddleware, fileAPIController.downloadFile);



module.exports = fileRouter;