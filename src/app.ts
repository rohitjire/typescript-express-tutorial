import express = require('express')
import Controller from 'interfaces/controller.interface'
import errorMiddleware from 'middleware/error.middleware'
import mongoose = require('mongoose')



class App{
    public app : express.Application
    public port: number

    constructor(controllers : Controller[] ,port:number){
        this.app = express(),
        this.port = port

        this.connectToDatabase()
        this.initializeMiddleware()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }

    private initializeMiddleware(){
        this.app.use(express.json())
    }

    private initializeErrorHandling(){
        this.app.use(errorMiddleware)
    }
    
    private initializeControllers(controllers: Controller[]){
        controllers.forEach((controller) => {
            this.app.use('/',controller.router)
        });
    }

    public listen(){
        this.app.listen(this.port,()=>{
            console.log(`App listening on the port ${this.port}`)
        })
    }

    private connectToDatabase(){
        const{
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env
        
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/myFirstDatabase?retryWrites=true&w=majority`, 
                        {useNewUrlParser:true, useUnifiedTopology: true})
        var db = mongoose.connection;
        db.once("open", function() {
            console.log("Connection Successful!");
          });
    }

}

export default App;