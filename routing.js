var express = require('express');

var directorData = require('./schema')
var filmData = require('./filmSchema')

var route = express.Router();

route.get('/direct', async (req, res) => {
    try {
        var forms = await directorData.find({});
        res.json({ forms });
    } catch (err) {
        res.json("Error occured");
    }
})
route.get('/film', async (req, res) => {
    try {
        var forms = await filmData.find({});
        res.json({ forms });
    } catch (err) {
        res.json("Error occured");
    }
})

route.post('/film',async (req,res)=>{
    let forms = new filmData(req.body);
    await forms.save();
    res.json({ forms })
})
route.post('/direct',async (req,res)=>{
    directorname=req.body.name;
    console.log(directorname);
    directorData.findOne({directorname}).exec((err,userCheck)=>{
        if(userCheck){
            return res.json({feedBack:"director exist"});
        }
        let forms = new directorData(req.body);
     forms.save();
    res.json({ forms })
    })
    
})

route.delete('/deleteFilm/:filmName', async (req, res) => {
    var filmName = req.params.filmName;
    await filmData.deleteOne({ name: filmName })
    res.json("delete success")
})
route.get('/direct/:name', async (req, res) => {
    var name = req.params.name;
    console.log(name)
    var data = await directorData.findOne({ name: name });
    console.log(data)
    res.json({ data });
})


route.put('/updateDirect/:name', async (req, res) => {
    var name = req.params.name;
    console.log(req.body.age);
    await directorData.updateOne({ name: name }, { $set: { age: req.body.age } })
    await directorData.updateOne({ name: name }, { $set: { awardCount: req.body.awardCount } })

    res.json("sucess")
})
route.get('/filmsearch/:fname', async (req, res) => {
    var fname = req.params.fname;
    console.log(fname)
    var data = await filmData.findOne({ name: fname });
    console.log(data)
    var name=data.director
    console.log(name)
     var directordata=await directorData.findOne({name:name})
     console.log(directordata)
     res.json({ directordata });
    
})

route.get('/film/:name', async (req, res) => {
    try {
        var directorName=req.params.name;
        var movies = await filmData.find({director:directorName});
        res.json({ movies });
    } catch (err) {
        res.json("Error occured");
    }
})




module.exports = route;