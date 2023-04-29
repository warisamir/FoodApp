const express = require('express');
const app = express();
//this is frst contri 
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser())

const userRouter = require('../Router/userRouter');
const planRouter = require('../Router/planRouter')
const reviewRouter=require('../Router/reviewRouter')
app.use('/user', userRouter);
// app.use("/auth", authRouter);
app.use('/plan', planRouter);
app.use('/Review',reviewRouter);
// const planmodel=require('../models/planModels')
app.listen(5000,()=>{
    console.log('Server running');
});
