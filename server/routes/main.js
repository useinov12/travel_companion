import express from 'express';
import { createUser } from '../controller/user'
import users from '../db'
const router = express.Router();

//DB simulation
const data  = {}
data.users = users;

router.post('/users', createUser)
// router.get('/users', (req, res)=>{
//     res.send('Users')
// })

export default router;