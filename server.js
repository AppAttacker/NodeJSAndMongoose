const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

// mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser: true
}).then(()=>{
    console.log("database connected successfully");
}).catch(err=>{
    console.log("database connection failed", err);
    process.exit();
});

app.get('/', (req, res)=>{
    res.json({'msg' : "Sample get call"});
});

const routes = require('./app/routes/note.routes.js')(app);

var server = app.listen('8006', ()=>{
    console.log("server listening on port# 8006...");
});