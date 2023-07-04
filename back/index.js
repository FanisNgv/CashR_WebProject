const express = require('express'); //import express from package express
const PORT = process.env.PORT || 5000; //choosing the port (system or default)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routs/authRouter');
const adminRouter = require('./routs/adminRouter');
const userRouter = require('./routs/userRouter');
const app = express(); //make app from express
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const start = async () => {
    try{
        await mongoose.connect(`mongodb+srv://FanisNGV:password111@cluster0.yv7s4qc.mongodb.net/?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    }catch(e){
        console.log(e);
    }
}
start();



