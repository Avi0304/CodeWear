import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../models/Order';
import mongoose from "mongoose";
import Head from 'next/head';


const MyOrder = ({ order, clearCart }) => {

  const router = useRouter();
  const { id } = router.query;
  console.log(order);
  const [OrderDate, setOrderDate] = useState("");


  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart()
      const date = new Date(order.createdAt);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setOrderDate(formattedDate);
    }
  }, [])


  return (
    <>
      <Head>
        <title>CoderWear.com - Order Details</title>
        <meta name="description" content="Welcome to my Next.js application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container  px-4 sm:px-5 py-10 sm:py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-1  mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear.com</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 ">OrderId - #{order._id.slice(-6)}</h1>
              <p className="leading-relaxed mb-4">Your Order have been successfully placed.</p>
              <p className='leading-relaxed mb-4'> Order Placed on <b>{OrderDate}</b></p>
              <p className='leading-relaxed mb-4'> Your Payment Status is <b>{order.paymentStatus}</b></p>
              <div class="flex mb-4">
                <a class="flex-grow text-center  py-2 text-lg px-1">Item Description</a>
                <a class="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
                <a class="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Total</a>
              </div>

              {order.products.map((product, index) => (
                <div key={index} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">
                    {product.name} ({product.size}/{product.variant})
                  </span>
                  <span className="ml-auto text-gray-900">{product.quantity}</span>
                  <span className="ml-auto text-gray-900">₹ {product.price * product.quantity}</span>
                </div>
              ))}

              <div className="flex flex-col mt-5">
                <span className="title-font font-medium text-2xl text-gray-900">SubTotal:₹ {order.amount}</span>
                <div className='my-6'>
                  <button className="flex mx-0 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                </div>

              </div>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col gap-4 -mt-10 pl-15 pr-15">
              {order.products.map((product, index) => (
                <img
                  key={index}
                  alt={product.name}
                  className="w-full lg:h-130 h-64 object-cover object-center rounded"
                  src={product.image || "/placeholder.png"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {

    await mongoose.connect(process.env.MONGO_URI);
  }

  let fetchorder = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(fetchorder)) }
  }
}

export default MyOrder