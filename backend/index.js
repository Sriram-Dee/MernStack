import express from "express";
import dotenv from "dotenv";
import connectDB from "./dataBase/db.js";
dotenv.config();

// Importing Route from another file
import userRoute from './routes/User.js'


const app = express();
//middle ware
app.use(express.json())
const port = process.env.PORT // Getting the port num from .env file

//using imported route with prefix
app.use('/api', userRoute)
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})
// app.get('/about', (req, res) => {
//     res.send('<h1>about</h1>')
// })
// app.get('/contact', (req, res) => {
//     res.send('<h1>Contact</h1>')
// })

app.listen(port, ()=>{
    console.log("Serever running in Port", port);
    connectDB()
})