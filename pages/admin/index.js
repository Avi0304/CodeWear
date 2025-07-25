import React, { useEffect, useState } from 'react';
import Sidebar from './sideBar';
import { LuActivity, LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import Head from 'next/head';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Link from 'next/link';
import withAdminAuth from '@/components/withAdminAuth';


const Index = ({ recentOrders, topProducts }) => {

  const [username, setUsername] = useState('Admin');
  const [metrics, setMetrics] = useState(null);


  useEffect(() => {
    const user = localStorage.getItem('myuser');
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.token;

      if (token) {
        fetch('/api/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }).then((res) => res.json())
          .then((data) => {
            if (data?.Name) {
              setUsername(data.Name);
            }
          })
          .catch((err) => {
            console.error('Failed to fetch user:', err);
          });
      }
    }
  }, [])

  useEffect(() => {
    fetch('/api/admin/metrics')
      .then((res) => res.json())
      .then((data) => {
        const formatGrowth = (value) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;

        setMetrics([
          {
            title: 'Total Revenue',
            value: `₹${data.revenue.toLocaleString()}`,
            growth: formatGrowth(data.revenueGrowth),
            subtitle: 'vs last month',
            gradient: 'from-green-500 to-emerald-600',
          },
          {
            title: 'Orders',
            value: data.orders.toLocaleString(),
            growth: formatGrowth(data.orderGrowth),
            subtitle: 'vs last month',
            gradient: 'from-pink-500 to-rose-600',
          },
          {
            title: 'Products',
            value: data.products.toString(),
            growth: formatGrowth(data.productGrowth),
            subtitle: 'vs last month',
            gradient: 'from-blue-500 to-cyan-600',
          },
          {
            title: 'Customers',
            value: data.customers.toLocaleString(),
            growth: formatGrowth(data.customerGrowth),
            subtitle: 'vs last month',
            gradient: 'from-purple-500 to-violet-600',
          },
        ]);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "paid":
        return "bg-green-100 text-green-700 border-green-200"
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "low stock":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "out of stock":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }


  return (
    <Sidebar>
      <Head>
        <title>CoderWear.com - Admin</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Admin dashboard to manage product inventory and stock status for CoderWear.com." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back, {username}</h2>
              <p className="text-lg text-pink-100">Here's what's happening in your store today.</p>
            </div>
            <LuActivity className="w-14 h-14 text-pink-200" />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics ? (
            metrics.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300"
              >
                <div className={`h-2 rounded-t-xl bg-gradient-to-r ${card.gradient}`} />
                <div className="p-6 text-center">
                  <p className="text-lg text-gray-900 font-bold">{card.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h2>
                  <div className="flex items-center justify-center mt-1">
                    <LuArrowUpRight className="w-5 h-5 text-green-600 mr-1" />
                    <span className={`text-sm font-medium ${card.growth.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {card.growth}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{card.subtitle}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading metrics...</p>
          )}

        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Recent Orders */}
          <div className='lg:col-span-2'>
            <div
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300"
            >
              <div className="pb-4 m-4">
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-bold text-gray-900'>Recent Orders</h2>

                  <Link href={'/admin/order'}>
                    <button
                      className='text-pink-500 border-2 border-pink-200 p-1.5 text-sm font-semibold hover:cursor-pointer  rounded-lg hover:text-pink-700'
                    >
                      View All
                    </button>
                  </Link>
                </div>
                <hr className='text-gray-300 mt-2' />
                <div className='p-0 mt-5'>
                  <div className='space-y-4 p-6 pt-0'>
                    {recentOrders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-xl  hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r  from-pink-400 to-rose-500 flex items-center justify-center mr-2 text-xs font-bold text-white">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{order.customer}</p>
                            {order.products?.map((p,i) => (
                              <p key={i} className="text-sm text-gray-500">{p.name?.substring(0, 25)}</p>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹ {order.amount}</p>
                          <div className={`${getStatusColor(order.status)} border text-xs text-center rounded-3xl p-1`}>{order.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className='lg:col-span-1'>
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300">
              <div className='pb-4 m-4'>
                <div className='flex items-center'>
                  <h2 className='text-gray-900 font-bold text-xl'>Top Products</h2>
                </div>
                <hr className='text-gray-300 mt-2' />
                <div className='p-0'>
                  <div className='space-y-4 mt-4'>
                    {topProducts.map((product) => (
                      <div key={product._id} className="flex justify-between p-4  rounded-lg hover:bg-gray-100/50  transition">
                        <div>
                          <p className="font-medium text-gray-900">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.totalSales} sales</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                          <LuArrowUpRight className="text-green-600 w-4 h-4 ml-auto" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codewears');
  }

  const recentOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // Add fallback name if missing
  recentOrders.forEach((order) => {
    if (!order.customer && order.name) {
      order.customer = order.name;
    }
  });


  const topProducts = await Product.aggregate([
    {
      $project: {
        title: 1,
        price: 1,
        totalSales: { $sum: '$sold' }, 
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 4 },
  ]);

  return {
    props: {
      recentOrders: JSON.parse(JSON.stringify(recentOrders)),
      topProducts: JSON.parse(JSON.stringify(topProducts)),
    },
  };
}

export default withAdminAuth(Index);
