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
//handle production
if(process.env.NODE_ENV==='production'){
//static folder
app.use(express.static(__dirname + '/public/'));
//handle SPA
app.get(/.*/,(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
});
app.post('/api/user/register',function(req, res) {
    res.json({ data: "registered" });
   })
   app.post('/api/user/login',function(req, res) {
    res.json({ data: "confirmed" });
   })

}





//listening server
const port=process.env.PORT ||3000
app.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}`)
})
