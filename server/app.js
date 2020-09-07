
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const routes = require('./routes');

const PORT = config.get('serverPort');

app.use((req, res, next)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Contetnt-type, Accept');
    app.options((req,res)=>{
        res.set('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
    next();
})
app.use(express.json());
app.use('/api/auth/', routes.authRouter)

const start = async ()=>{
    try{
        await mongoose.connect(config.get('dbUrl'),
        {
            useNewUrlParser: true,    
            useUnifiedTopology: true
            }, ()=>{
            console.log('mongoose connected to db: ', config.get('dbName'))
        });
        app.listen(PORT, ()=>{
            console.log(`server running at port: ${PORT}`);
        });
    }
    catch(err){
        console.log('Start server error: ',err);
    }
}

start();