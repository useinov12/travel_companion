import mongoose from 'mongoose'

import { Document } from 'mongoose'

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


interface User extends Document {
    _id:string
    username:string
    email:string
    places:any[]
}

export default mongoose.model<User>('User', UserSchema) ;