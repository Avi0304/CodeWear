import Orders from "../../models/Order"
import ConnectDB from "../../middleware/mongoose"
import Order from "../../models/Order";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end("Method not Allowed");
    }

    await ConnectDB();
    const { orderId, paymentStatus, status, amount } = req.body;
    try {
        await Order.findByIdAndUpdate(orderId, {
            paymentStatus,
            status,
            amount,
        });

        res.status(200).send("Successfully update...")
    } catch (err) {
        console.error('Order update error:', err);
        res.status(500).json({ error: 'Failed to update order status' });
    }
}