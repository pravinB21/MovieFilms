var mongoose=require('mongoose');
const { stringify } = require('qs');

var directorschema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:String,required:true},
    gender:{type:String,required:true},
    awardCount:{type:Number , required:true},    
})

var directormodel=mongoose.model('directors',directorschema);

module.exports=directormodel;