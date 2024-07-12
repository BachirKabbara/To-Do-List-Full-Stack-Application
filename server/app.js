import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import categoryRoutes from './routes/category.js';
import todoRoutes from './routes/todo.js';
import userRoutes from './routes/user.js';

const app = express();
const port =4000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://bachirmkabbara:KvL7eJTNPEQyteEw@cluster0.elyumhi.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Routes
app.use('/categories', categoryRoutes);
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
