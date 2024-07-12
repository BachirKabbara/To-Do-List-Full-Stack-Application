import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).send({ token, userId: user._id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, oldPassword, password, profilePicture, taskView } = req.body;

  try {
    const user = await User.findById(userId);

    if (oldPassword && !await bcrypt.compare(oldPassword, user.password)) {
      return res.status(400).send({ error: 'Old password is incorrect' });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;
    user.taskView = taskView || user.taskView;

    await user.save();

    res.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
