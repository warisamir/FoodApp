const express = require('express');
const app = express();
//this is frst contri 
const cookieParser=require('cookie-parser');
var cors=require("cors");
app.use(cors());
app.use(express.static('public/build'))

app.use(express.json());
app.use(cookieParser())

const userRouter = require('../Router/userRouter');
const planRouter = require('../Router/planRouter')
const reviewRouter=require('../Router/reviewRouter');
const bookingRouter = require('../Router/BookingRouter');
app.use('/user', userRouter);
// app.use("/auth", authRouter);
app.use('/plan', planRouter);
app.use('/Review',reviewRouter);
app.use('/booking',bookingRouter);

const port=process.env.PORT||5000;
app.listen(port);