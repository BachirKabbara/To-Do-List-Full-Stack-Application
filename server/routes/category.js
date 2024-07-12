import express from 'express';
import { createCategory, getCategories } from '../controller/category.js';
import isAuth from '../middleware/is-auth.js';

const router = express.Router();

router.post('/', isAuth, createCategory);
router.get('/', isAuth, getCategories);

export default router;
