import mongoose from 'mongoose';
import User from '../models/user'


export async function createUser(req, res ){
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username:req.body.username, 
        email:req.body.email,
        places:[]
    })
    try {
        const newUser = await user.save();
        return res.status(201).json({
            success: true,
            message: 'New user created successfully',
            User: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    }
}