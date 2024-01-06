// models/User.js
import mongoose from 'mongoose';

if (mongoose.models.User) {
  module.exports = mongoose.models.User;
} else {
  const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
  });

  module.exports = mongoose.model('User', userSchema);
}
