import express from 'express';
import { createUser, getUserByEmail, addFavPlace, removeFavPlace } from '../controller/user';
const router = express.Router();

router.get('/users/find', getUserByEmail)
router.post('/users/create', createUser)

router.put('/users/add_favorite', addFavPlace)
router.put('/users/remove_favorite', removeFavPlace)

export default router;