import express from 'express';
import { createuser, getuser, addfavorite, removefavotite } from '../controller/user';
const router = express.Router();


router.get('/users', getuser)
router.post('/users', createuser)

router.put('/users/add_favorite', addfavorite)
router.put('/users/remove_favorite', removefavotite)

export default router;