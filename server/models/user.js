import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: './profile.png' },
  taskView: { type: String, default: 'Date' }
});

const User = mongoose.model('User', userSchema);

export default User;
