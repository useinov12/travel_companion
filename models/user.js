import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const  Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    places:{
        type:Array,
        required:true
    }
})

export default mongoose.model('User', UserSchema) ;