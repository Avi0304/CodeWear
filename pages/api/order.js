import Order from '../../models/Order';
import ConnectDB from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log("Received order:", req.body);
      const order = await Order.create(req.body);
      
      return res.status(200).json({ success: true, order });
    } catch (err) {
      console.error('Order Save Error:', err);
      return res.status(500).json({ error: 'Failed to save order' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default ConnectDB(handler);
