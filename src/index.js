const os=require('os');
const cluster=require('cluster');
const express = require('express')
const chalk = require('chalk')

require('./db/start_server')

const room = require('./models/rooms')
const app = express();
const port = process.env.PORT||3000

app.use(express.json())

if(cluster.isMaster)
{
    let noofcomps=os.cpus().length;
    console.log(noofcomps);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < noofcomps; i++) {
        console.log(`worker number is ${i}`);
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    })


}
else
{
    //get details of all room using cluster
    app.get('/rooms',(req,res)=>{
        //find is used to fetch all rooms
        room.find({}).then((all_room)=>{
            res.send(all_room)
    
        }).catch((e)=>{
            //500 because fetching failed when server failed
            res.status(500).send(e)
        })
    })
    app.listen(port,() => console.log(chalk.blue('Server Up and running on '+port)))
}
