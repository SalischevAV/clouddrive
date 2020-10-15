const fileService = require('../services/FileService');
const config = require('config');
const fs = require('fs');
const File = require('../model/File');
const User = require('../model/User');
const Uuid = require('uuid');

class FileAPIController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body;
            const file = new File({ name, type, parent, user: req.user.id });
            const parentFile = await File.findOne({ _id: parent });
            if (!parentFile) {
                file.path = name;
                await fileService.createDir(file);
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await fileService.createDir(file);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return res.status(201).
                json(file);
        }
        catch (err) {
            console.log(err);
            return res.status(400)
                .json(err);
        }
    }

    async getFiles(req, res) {
        try {
            const { sort } = req.query;
            let files;
            switch (sort) {
                case 'name': files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({name:1});
                break;
                case 'type':files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({type:1});
                break;
                case 'date':files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({date:1});
                break;
                case 'size':files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({size:1});
                break;
                default: files = await File.find({ user: req.user.id, parent: req.query.parent });
                    break;
            }

            return res.json(files);
        }
        catch (err) {
            console.log(err);
            return res.status(500)
                .json({ message: 'Can not get files' });
        }

    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file;

            const parent = await File.findOne({ user: req.user.id, _id: req.body.parent });
            const user = await User.findById(req.user.id);

            if ((user.usedSpace + file.size) > user.diskSpace) {
                return res.status(400)
                    .json({ message: 'There are not space on the disk' });
            }
            user.usedSpace += file.size;

            let path;
            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`;
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
            }

            if (fs.existsSync(path)) {
                return res.status(400)
                    .json({ message: 'File already exist' });
            }
            file.mv(path);

            const type = file.name.split('.').pop();
            let filePath = file.name;
            if (parent) {
                filePath = parent.path + "\\" + file.name;
            }

            let fileObj = {
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                user: user._id
            }
            if (parent) {
                fileObj = {
                    name: file.name,
                    type,
                    size: file.size,
                    path: filePath,
                    parent: parent._id,
                    user: user._id
                }
            }
            const dbFile = new File(fileObj);

            await dbFile.save();
            await user.save();

            res.status(201)
                .json(dbFile);
        }
        catch (err) {
            console.log(err);
            return res.status(500)
                .json({ message: 'Upload error' });
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id });
            // const path = config.get('filePath') + '\\' + req.user.id + '\\' + file.path;
            const path = fileService.getPath(file);

            if (fs.existsSync(path)) {
                return res.download(path, file.name);
            } else {
                return res.status(400)
                    .json({ message: 'File not found' });
            }

        } catch (err) {
            console.log(err);
            return res.status(500)
                .json({ message: 'Download error' });
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id });
            if (!file) {
                return res.status(400)
                    .json({ message: 'File not found' });
            }
            fileService.deleteFile(file);
            await file.remove();
            return res.json({ message: 'File was deleted' });
        }
        catch (err) {
            console.log(err);
            return res.status(400)
                .json({ message: 'File not empty' });
        }
    }

    async searchFile(req, res){
        try{
            const searchWord = req.query.search;
            let files = await File.find({user: req.user.id});
            files = files.filter(file =>file.name.includes(searchWord));
            return res.json(files);

        }catch(err){
            console.log(err);
            return res.status(400)
                .json({ message: 'Search error' });
        }
    }

    async uploadAvatar(req, res){
        try{
            const file = req.files.file;
            const user = await User.findById(req.user.id);
            const avatarName = Uuid.v4()+ '.jpg';
            file.mv(config.get('staticPath') + '\\' + avatarName);
            user.avatar = avatarName;
            await user.save();
            return res.json(user);

        }
        catch(err){
            console.log(err);
            return res.status(400)
                .json({ message: 'Upload avatar error' });
        }
    }
    async deleteAvatar(req, res){
        try{
            const user = await User.findById(req.user.id);
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar);
            user.avatar = null;
            await user.save();
            return res.json(user);

        }
        catch(err){
            console.log(err);
            return res.status(400)
                .json({ message: 'Delete avatar error' });
        }
    }

}

module.exports = new FileAPIController();