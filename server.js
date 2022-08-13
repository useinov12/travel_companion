import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


import connectDB from './config/connectDB.js'
import mainRouter from './routes/main.js'


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001

// Cross Origin Resource Sharing
const whitelist = ['http://127.0.0.1:5500', 'https://travel-comp-app.herokuapp.com'];

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
// app.get('/', (req, res)=>{
//     res.send('Hello server')
// })

app.use('/api', mainRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); // serve the static react app
    app.get(/^\/(?!api).*/, (req, res) => { // don't serve api routes to react app
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    console.log('Serving React App...');
  };

// // Step 1:
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });



mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen( PORT, ()=> console.log(`Server on port ${PORT}`));
})



