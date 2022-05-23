const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const  authRoutes= require('./routes/auth')
const postRoutes=require('./routes/post')
//express app
const app=express();
//DB connections
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('connected to the db');
})

//middlewares
app.use(bodyParser.json())
app.use(cors());
app.use('/api/user',authRoutes)
app.use('/api/post',postRoutes)



app.get('/',(req,res)=>{
    res.json({message:'serving well'})
})


//listening server
const port=process.env.PORT ||3000
app.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}`)
})
