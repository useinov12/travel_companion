import mongoose from 'mongoose';
import User from '../models/user'


export async function createUser(req, res){

    // console.log({fromGETBody:{email:req.body.email, name:req.body.username}})
    // console.log({fromGETQuery:{email:req.query.email, name:req.query.username}})
    const usr = new User({
        _id: mongoose.Types.ObjectId(),
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
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });

}

export async function getUserByEmail(req, res){

    // console.log({fromGETBody:req.body.email})
    // console.log({fromGETQuery:req.query.email})
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

export async function addFavPlace(req, res){
    try{
        const updatedUser = await User.updateOne( {email:req.query.email},{ $addToSet:{places:req.query.place} })
        return res.status(200).json({
            success: true,
            message: `Place added!`,
            User: updatedUser,
        });
    } catch(error){
        res.status(500).hson({
            success: false,
            message: 'Could not add place',
            error: err.message,
        });
    }
}

export async function removeFavPlace(req, res){
    try{
        const updatedUser = await User.updateOne( {email:req.query.email}, { $pull: { places:req.query.place } });
        return  res.status(200).json({
            success: true,
            message: `Place deleted!`,
            User: updatedUser,
        });
    } catch(error){
        res.status(500).hson({
            success: false,
            message: 'Could not add place',
            error: err.message,
        });
    }
}