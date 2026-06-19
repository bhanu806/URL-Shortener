const express=require('express');
const urlRoute=require('./routes/url');
const app=express();
const PORT=8001;
const {connectToMongoDB}=require('./connect')
const cors=require("cors")

connectToMongoDB('mongodb://127.0.0.1:27017/URLshortener').then(()=>console.log('mongoDb connected'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/url",urlRoute);

app.listen(PORT,()=>console.log(`server started at ${PORT}`));