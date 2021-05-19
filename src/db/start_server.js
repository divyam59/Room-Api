//for connection to mongodb
const mongoose = require('mongoose')

//This will connect to mongodb server at ip : 127.0.0. and port 27017
mongoose.connect('mongodb://127.0.0.1:27017/Room-data',{
    useNewUrlParser:true,
    useCreateIndex:true
})

