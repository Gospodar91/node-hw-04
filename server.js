const express = require("express");
const mongoose = require('mongoose')
const contactsActions=require('./routes/route')
const  bodyParser = require('body-parser')

const morgan = require("morgan");

require("dotenv").config();
const cors = require('cors');
const PORT=process.env.PORT

export class MongoDBServer {

  constructor(){
    this.server = null;
  }

async start(){
  this.initServer()
  this.initMiddleware()
  this.initRout()
  await this.initDataBase()
  this.startListening()
}
initServer=()=>{
  this.server = express();
}
initMiddleware=()=>{
this.server.use(express.json());
this.server.use(express.static("public"));
this.server.use(morgan("dev"));
this.server.use(bodyParser.urlencoded({ extended: true }));
// this.server.use(cors({origin:process.env.ALLOWED_ACESS}))

}
initRout=()=>{
  this.server.use('/',contactsActions)
  this.server.use('/auth',contactsActions)

}

initDataBase=()=>{
  try{
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
    useFindAndModify:true
})
  console.log("Database connection successful");
} catch (error) {
  console.log("Connecting error:", error.message);
  process.exit(1);
}
}
startListening=()=>{

  this.server.listen(PORT,()=>{
    console.log('server started on',PORT )
  })
}
}











