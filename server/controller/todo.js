import Todo from '../models/todo.js';

export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userEmail: req.userId
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userEmail: req.userId }).populate('category');
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).send({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
