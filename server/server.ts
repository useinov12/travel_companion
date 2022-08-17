import express from 'express'
import dotenv from 'dotenv'
import cors, {CorsOptions} from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import routes from './routes/main'


dotenv.config();
const app = express();

const PORT  = process.env.PORT;

// Cross Origin Resource Sharing
const whitelist = ['http://127.0.0.1:5500', 'http://localhost:3000'];

const corsOptions:CorsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin!) !== -1 || !origin) {
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
import './config/connectDB';

//routes
app.use('/api', routes);


// Production Deploy static files
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
  }
  

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen( PORT, ()=> console.log(`Server on port ${PORT}`));
})



