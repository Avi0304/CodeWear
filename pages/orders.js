import React from 'react';
import Order from '../models/Order';
import mongoose from 'mongoose';
import Link from 'next/link';
import Head from 'next/head';


const Orders = ({ order }) => {
    return (
        <>
            <Head>
                <title>CoderWear.com - Orders</title>
                <meta name="description" content="Welcome to my Next.js application." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto mb-8">
                <h1 className="text-center font-bold text-2xl p-8">My Orders</h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                        <tr>
                                            <th className="px-6 py-4">#</th>
                                            <th className="px-6 py-4">OrderId</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            {/* <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Variant</th>
                                        <th className="px-6 py-4">Size</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Qty</th> */}
                                            {/* <th className="px-6 py-4">Total</th> */}
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Shipping Status</th>
                                            <th className='px-6 py-4'>Details</th>
                                            <th className="px-6 py-4">Order Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.length === 0 && (
                                            <tr>
                                                <td colSpan="12" className="text-center py-4 text-gray-500">
                                                    No orders found.
                                                </td>
                                            </tr>
                                        )}

                                        {order.map((o, i) =>
                                            o.products.map((p, j) => (
                                                <tr
                                                    key={`${o._id}-${j}`}
                                                    className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{o._id.substring(0, 6)}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{j === 0 ? o.name : ''}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{j === 0 ? o.email : ''}</td>
                                                    {/* <td className="whitespace-nowrap px-6 py-4">{p.name}</td> */}
                                                    {/* <td className="whitespace-nowrap px-6 py-4">{p.variant}</td> */}
                                                    {/* <td className="whitespace-nowrap px-6 py-4">{p.size}</td> */}
                                                    {/* <td className="whitespace-nowrap px-6 py-4">₹{p.price}</td> */}
                                                    {/* <td className="whitespace-nowrap px-6 py-4">{p.quantity}</td> */}
                                                    {/* <td className="whitespace-nowrap px-6 py-4">₹{p.price * p.quantity}</td> */}
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {j === 0 && (
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${o.status === 'Paid'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : o.status === 'Pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-gray-100 text-gray-800'
                                                                    }`}
                                                            >
                                                                {o.status}
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {j === 0 && (
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${o.shippingStatus === 'Shipped'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : o.shippingStatus === 'unshipped'
                                                                        ? 'bg-red-100 text-red-800'
                                                                        : 'bg-gray-100 text-gray-800'
                                                                    }`}
                                                            >
                                                                {o.shippingStatus}
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className='whitespace-nowrap px-6 py-4'>{j == 0 && (
                                                        <Link href={`/order?id=${o._id}`} className="text-pink-600 font-semibold hover:underline">
                                                            View
                                                        </Link>
                                                    )}</td>

                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {j === 0 ? new Date(o.createdAt).toLocaleDateString() : ''}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect('mongodb://localhost:27017/codewears');
    }

    let fetchorder = await Order.find({ paymentStatus: "paid" });
    return {
        props: { order: JSON.parse(JSON.stringify(fetchorder)) },
    };
}

export default Orders;
