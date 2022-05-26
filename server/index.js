const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const  authRoutes= require('./routes/auth')
const postRoutes=require('./routes/post')
const path=require('path')
//express app
const app=express();
//DB connections
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
mongoose.connect(process.env.DB_CONNECT,{
   useNewUrlParser: true 
}).then(()=>{console.log(`connected to db`);}).catch((err)=>{console.log(`ERROR::${err}`);})

//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api/user',authRoutes)
app.use('/api/post',postRoutes)
//listening server
const port=process.env.PORT ||3000
app.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}`)
})
