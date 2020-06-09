
require=require('esm')(module);
const path =require('path')


require('dotenv').config({path:path.join(__dirname,'./env')})
const {MongoDBServer}=require('./server')
new MongoDBServer().start()