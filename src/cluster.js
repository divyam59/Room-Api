const os=require('os');
const cluster=require('cluster');

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
    require('./index');
}