import { Request, Response } from 'express'
import mongoose from 'mongoose';
import User from '../models/user'


export async function createuser(req:Request, res:Response){
    const usr = new User({
        _id: new mongoose.Types.ObjectId(),
        username:req.body.username, 
        email:req.body.email,
        places:[]
    })
    return usr.save()
    .then( newUsr  => {
      return res.status(201).json({
        success: true,
        message: 'New user created successfully',
        User: newUsr,
      });
    })
    .catch( error => {
      return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

export async function getuser(req:Request, res:Response){

    const gmail = req.query.email;

    await User.findOne( {'email':gmail} )
    .then(usr =>{
        return res.status(200).json({
            success: true,
            message: `User Found!`,
            User: usr,        
        });
    })
    .catch(error =>{
        return res.status(500).json({
            success: false,
            message: 'This user does not exist',
            error: error.message,
        });
    })

}

export async function addfavorite(req:Request, res:Response){
    try{
        const updatedUser = await User.updateOne( {email:req.query.email},{ $addToSet:{places:req.query.place} })
        return res.status(200).json({
            success: true,
            message: `Place added!`,
            User: updatedUser,
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Could not add place',
            error: error.message,
        });
    }
}

export async function removefavotite(req:Request, res:Response){
    try{
        const updatedUser = await User.updateOne( {email:req.query.email}, { $pull: { places:req.query.place as any} });
        return  res.status(200).json({
            success: true,
            message: `Place deleted!`,
            User: updatedUser,
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Could not add place',
            error: error.message,
        });
    }
}