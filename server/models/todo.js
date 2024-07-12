import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  userEmail: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
