const express =require('express');
const app=express();



const userRouter= require("./routes/userRoute.js");

const tweetRouter=require("./routes/tweetRoute.js");

app.use(express.json());

app.use('/user',userRouter);

app.use('/tweet',tweetRouter);



app.get("/",(req,res)=>{
    //console.log("Hello");
    res.send("Hello");
})

app.listen(3000,()=>{
    console.log("Lisrening on port 3000");
})