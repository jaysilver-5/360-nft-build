// pages/api/auth.js
import { dbConnect, dbClose } from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    // Signup
    const { userId, username, profilePicture, walletAddress } = req.body;

    try {
      await User.create({ userId, username, profilePicture, walletAddress });
      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error, indicating conflict (user already exists)
        res.status(409).json({ success: false, message: 'User already exists' });
      } else {
        res.status(400).json({ success: false, message: 'Error creating user' });
      }
    }
  } else if (req.method === 'GET') {
    // Login
    const { walletAddress } = req.query;

    try {
      const user = await User.findOne({ walletAddress });
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error finding user' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  dbClose(); // Close the MongoDB connection after handling the request
}
