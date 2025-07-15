import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoBagCheckSharp } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import Link from 'next/link';
import Head from 'next/head';


export default function Success() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [cardLast4, setCardLast4] = useState('');

  // useEffect(() => {
  //   if (router.query.clearCart == 1){
  //     clearCart();
  //   }
  // },[])

  useEffect(() => {
    const updateOrderStatus = async () => {
      const { session_id } = router.query;
      if (!session_id) return;

      const res = await fetch(`/api/get-session?session_id=${session_id}`);
      const data = await res.json();
      const { metadata, amount_total, payment_status, card_last4 } = data.session;
      setOrderId(metadata.orderId);
      setAmount(amount_total / 100);
      setCardLast4(card_last4);

      // ✅ Update the order created before checkout
      await fetch('/api/update-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: metadata.orderId,
          paymentStatus: payment_status,
          amount: amount_total / 100,
          status: 'Paid',
        }),
      });

      const parsedCart = JSON.parse(metadata.cart);

      await fetch('/api/update-stock', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: parsedCart }),
      })
    };

    updateOrderStatus();
  }, [router.query.session_id]);

  return (
    <>
      <Head>
        <title>CoderWear.com - Payment Page</title>
        <meta name="description" content="Welcome to my Next.js application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='min-h-screen  flex items-center justify-center p-4'>
        <div className='w-full max-w-md bg-white rounded-xl shadow-xl p-6 transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl'>
          <div className='text-center mb-6'>
            <div className='mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
              <IoBagCheckSharp className='w-8 h-8 text-green-600' />
            </div>
            <h1 className='text-2xl font-bold text-gray-900'>Payment Sucessfull!</h1>
            <p className='mt-2 text-gray-800'>Thank you for your purchase. Your order has been confirmed and is being processed.</p>
          </div>

          <div className='bg-gray-50 rounded-lg p-4 space-y-2 mb-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Order Number</span>
              <span className='font-mono font-medium'># {orderId.slice(-6)}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Payment Method</span>
              <span className='font-mono font-medium'>**** **** **** {cardLast4}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Total Amount</span>
              <span className='font-mono font-medium'>₹ {amount}</span>
            </div>

            <div className='space-y-3 flex items-center justify-center mt-5'>
              <Link href={`/order?id=${orderId}&clearCart=1`}>
                <button className='flex items-center justify-items-center text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm "'>
                  <LuEye className='w-4 h-4 mr-2' />
                  View Order Details
                </button>
              </Link>
            </div>

            <p className='text-center text-gray-500 text-sm mt-6'>A Confirmation Email is Sent to your Register Email Address</p>
          </div>
        </div>
      </div>
    </>
  );
}
