// pages/api/getOrders.js
import Order from '@/models/Order';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codewears');
    }

    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
