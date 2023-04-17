const express = require('express');
const app = express();
//this is frst contri 
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser())

const userRouter = require('../Router/userRouter')
const authRouter = require('../Router/authRouter')
 
app.use('/user', userRouter);
app.use("/auth", authRouter);
app.listen(5000,()=>{
    console.log('Server running');
});
