import mongoose, {ConnectOptions} from 'mongoose';


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URI!, {
            useUnifiedTopology:true,
            useNewUrlParser:true
        } as ConnectOptions)
    } catch(err){
        console.log(err)
    }
}

export default connectDB;