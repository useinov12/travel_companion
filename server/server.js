import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from '../server/config/connectDB'
import mainRouter from './routes/main'


dotenv.config();
const app = express();

const PORT  = 3001;

//connect to DB
connectDB();


//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.use('/api', mainRouter);

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen( PORT, ()=> console.log(`SERVER listening on port${PORT}`));
})



