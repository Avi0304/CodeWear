// pages/api/admin/metrics.js

import connectDB from '@/middleware/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';

const handler = async (req, res) => {
  try {
    await connectDB();

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Orders
    const ordersThisMonth = await Order.find({ createdAt: { $gte: startOfThisMonth } });
    const ordersLastMonth = await Order.find({
      createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
    });

    const revenueThisMonth = ordersThisMonth.reduce((sum, o) => sum + (o.amount || 0), 0);
    const revenueLastMonth = ordersLastMonth.reduce((sum, o) => sum + (o.amount || 0), 0);

    const orderCountThisMonth = ordersThisMonth.length;
    const orderCountLastMonth = ordersLastMonth.length;

    // Product Count
    const productCount = await Product.countDocuments();

    // Customers (unique emails from orders)
    const customersThisMonthAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfThisMonth } } },
      { $group: { _id: "$email" } },
      { $count: "count" }
    ]);
    const customersThisMonth = customersThisMonthAgg[0]?.count || 0;

    const customersLastMonthAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } } },
      { $group: { _id: "$email" } },
      { $count: "count" }
    ]);
    const customersLastMonth = customersLastMonthAgg[0]?.count || 0;

    const calcGrowth = (current, previous) => {
      if (previous === 0) return current === 0 ? 0 : 100;
      return ((current - previous) / previous) * 100;
    };

    res.status(200).json({
      revenue: revenueThisMonth,
      revenueGrowth: calcGrowth(revenueThisMonth, revenueLastMonth),

      orders: orderCountThisMonth,
      orderGrowth: calcGrowth(orderCountThisMonth, orderCountLastMonth),

      products: productCount,
      productGrowth: 0, // static

      customers: customersThisMonth,
      customerGrowth: calcGrowth(customersThisMonth, customersLastMonth)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
