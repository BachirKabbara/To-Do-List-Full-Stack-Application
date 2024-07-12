import express from 'express';
import { createTodo, getTodos, deleteTodo } from '../controller/todo.js';
import isAuth from '../middleware/is-auth.js';

const router = express.Router();

router.post('/', isAuth, createTodo);
router.get('/', isAuth, getTodos);
router.delete('/:id', isAuth, deleteTodo);

export default router;
