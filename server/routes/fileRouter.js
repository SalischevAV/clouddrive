const fileRouter = require('express').Router();
const authMiddleware = require('../middleware/auth');
const fileAPIController = require('../controller/FileAPIController')

fileRouter.post('', authMiddleware, fileAPIController.createDir);
fileRouter.post('/upload', authMiddleware, fileAPIController.uploadFile);
fileRouter.post('/avatar', authMiddleware, fileAPIController.uploadAvatar);

fileRouter.get('', authMiddleware, fileAPIController.getFiles);
fileRouter.get('/download', authMiddleware, fileAPIController.downloadFile);
fileRouter.get('/search', authMiddleware, fileAPIController.searchFile);

fileRouter.delete('/', authMiddleware, fileAPIController.deleteFile);
fileRouter.delete('/avatar', authMiddleware, fileAPIController.deleteAvatar);






module.exports = fileRouter;