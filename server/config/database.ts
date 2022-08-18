import mongoose, {ConnectOptions, CallbackError} from 'mongoose';

const URI = process.env.MONGODB_URL 

mongoose.connect(`${URI}`, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    } as ConnectOptions,
    
    (err:CallbackError) => {
    if(err) throw err;
    console.log('Mongodb connection')
})
