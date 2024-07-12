import express from 'express';
import { signup, login, updateUser, getUsers } from '../controller/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/:userId', updateUser);
router.get('/', getUsers);

export default router;
