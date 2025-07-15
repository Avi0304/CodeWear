import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent.payment_method'],
    });
    const cardLast4 = session.payment_intent.payment_method.card.last4;
    res.status(200).json({
      session: {
        metadata: session.metadata,
        amount_total: session.amount_total,
        payment_status: session.payment_status,
        card_last4: cardLast4, 
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
}
