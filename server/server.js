import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from '../server/config/connectDB'
import mainRouter from './routes/main'


dotenv.config();
const app = express();

const PORT  = process.env.PORT;

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
//body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//connect to DB
connectDB();


//routes
app.get('/', (req, res)=>{
    res.send('Hello server')
})

app.use('/api', mainRouter);

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen( PORT, ()=> console.log(`Server on port ${PORT}`));
})



