// pages/api/user/[userId].js
import { dbConnect } from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.query;

  try {
    const user = await User.findOne({ userId });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
