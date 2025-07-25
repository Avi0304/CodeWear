import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Order from "../../models/Order";
import ConnectDB from "../../middleware/mongoose";
import Product from '../../models/Product';
import pincode from "../../pincode.json"


export default async function handler(req, res) {
  await ConnectDB();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { userId, cart, email, name, address, phone, shippingStatus } = req.body;

    const verifiedCart = {};
    const line_items = [];
    let subtotal = 0;

    // Validate and rebuild cart from DB
    for (const slug of Object.keys(cart)) {
      const item = cart[slug];

      const dbProduct = await Product.findOne({ slug });

      // ✅ Clean and check pincode
      const cleanPincode = String(address.postal_code).trim();

      if (!pincode.hasOwnProperty(cleanPincode)) {
        return res.status(400).json({ error: `Pincode ${cleanPincode} is not serviceable.` });
      }


      if (!dbProduct || dbProduct.price !== item.price) {
        return res.status(400).json({ error: `Price mismatch or invalid product: ${slug}` });
      }


      if (dbProduct.avaiableQty < item.qty) {
        if (dbProduct.avaiableQty < 0) {
          return res.status(400).json({ error: `Item is Out of Stock ${item.name}` })
        } else {
          return res.status(400).json({ error: `Insufficient stock for ${item.name}. Only ${dbProduct.avaiableQty} left` })
        }
      }


      verifiedCart[slug] = {
        ...item,
        price: dbProduct.price,
      };

      line_items.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: dbProduct.title,
            images: [dbProduct.img]
          },
          unit_amount: dbProduct.price * 100,
        },
        quantity: item.qty,
      });

      subtotal += dbProduct.price * item.qty;
    }

    if (subtotal <= 0) {
      return res.status(400).json({ error: `Cart is Empty!. Please Build the Cart First ` })
    }


    // Prepare order products array
    const products = Object.entries(verifiedCart).map(([productId, item]) => ({
      productId,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      variant: item.variant,
      size: item.size,
      image: item.img || '',
    }));


    // ✅ Validate Phone and Pincode
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Please enter a valid 10-digit phone number." });
    }

    if (!/^\d{6}$/.test(address.postal_code)) {
      return res.status(400).json({ error: "Please enter a valid 6-digit pincode." });
    }


    // Create order with PENDING status before payment
    const newOrder = await Order.create({
      userId,
      email,
      name,
      phone,
      address,
      products,
      amount: subtotal,
      status: 'Pending',
      paymentStatus: 'unpaid',
      shippingStatus
    });


    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      address: {
        line1: address.line1,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: 'IN',
      },
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card' ],
      mode: 'payment',
      customer: customer.id,
      line_items,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        orderId: newOrder._id.toString(),
        cart: JSON.stringify(verifiedCart),
        name,
        email,
        phone,
        userId,
        address: JSON.stringify(address),
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
