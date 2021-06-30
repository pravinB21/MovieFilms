var express = require('express')
var cors=require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var userlist=require('./routing');

var app=express();
app.use(bodyParser.json());
app.use(cors());


var mongo_url = `mongodb+srv://mydb1:kalingaM1064510@myfirstcluster.ztqlo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})



app.use('/',userlist);
app.listen(4030, ()=>{console.log('Server up and running')});
