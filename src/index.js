//this is the main file which consist all endpoints

const express = require('express')
const chalk = require('chalk')
//to attach mongoose and run it as soon as index.js starts
//mongoose file contains code to start mongodb server
require('./db/start_server')

//to access room model
const room = require('./models/rooms')

const app = express();
//In many environments (e.g. Heroku), and as a convention, you can 
//set the environment variable PORT to tell your web server what port to listen on
const port = process.env.PORT||3000

//to convert data from json to object form automatically(express.json())
//so that we can extract details from request in object form
app.use(express.json())

//To create room 
app.post('/rooms',(req,res)=>{
    const new_room = new room(req.body)
    new_room.save().then(()=>{
        //201 status code: room is created
        res.status(201).send(new_room)
    }).catch((e)=>{
        //400 status code: Bad request, not provided all fields that are required
        res.status(400).send(e)
    })
})
//to read data of all rooms
app.get('/rooms',(req,res)=>{
    //find is used to fetch all rooms
    room.find({}).then((all_room)=>{
        res.send(all_room)

    }).catch((e)=>{
        //500 because fetching failed when server failed
        res.status(500).send(e)
    })
})

//fetch data by id
//id can be fetched from the link usinf req.params
// 2 method to find one record: 1) findById ->to find by id
// 2) findOne() to find by one record using any field

app.get('/rooms/:id',(req,res)=>{
    //req.params.id will fetch id from request and store it in _id
    const _id = req.params.id
    //findById will return null if no rooms exist that will be not an error,
    //so we send 404 if user is NULL as we didn't find that record
    //else we send data
    room.findById({_id}).then((room)=>{
        if(!room)
        return res.status(404).send()
        else
        res.send(room)
    }).catch((e)=>{
        //500:server side error
        res.status(500).send(e)
    })

})

//to delete using id
app.delete('/rooms/:id',(req,res)=>{
    const _id = req.params.id
    //There are many ther delete functions(like findByIdAndRemove(),findOneAndDelete()
    //,deleteMany(),deleteOne()) but this suits to current demand
    room.findByIdAndDelete({_id}).then((room)=>{
        if(!room)
        return res.status(404).send()
        
        res.status(200).send(room)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

//To fire up the server
app.listen(port,() => console.log(chalk.blue('Server Up and running on '+port)))