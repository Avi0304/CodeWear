// ✅ TOP: Only one import of Order
import React, { useState } from 'react';
import Sidebar from './sideBar';
import {
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  LuActivity,
  LuArrowUpRight,
  LuDownload,
  LuEye,
  LuIndianRupee,
  LuUser,
} from 'react-icons/lu';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import Head from 'next/head';
import withAdminAuth from '@/components/withAdminAuth';




const Customers = ({ customers, stats }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterCustomer = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();

    const formattedDate = new Date(customer.latestOrderDate)
      .toLocaleDateString('en-GB')
      .replace(/\//g, '-');

    return (
      customer.email.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query) ||
      customer.totalOrders.toString().toLowerCase().includes(query) ||
      customer.totalAmount.toString().toLowerCase().includes(query) ||
      formattedDate.includes(query)
    )
  })

  return (
    <Sidebar>
      <Head>
        <title>CoderWear.com - Admin - Customers</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Admin dashboard to manage product inventory and stock status for CoderWear.com." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-2xl text-gray-900">Customer</h2>
            <p className="text-gray-600 mt-1 capitalize">
              View And Manage Customer Information
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Search customers..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: 250,
                backgroundColor: 'white',
                borderRadius: '6px',
              }}
            />

            {/* Export */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer">
              <LuDownload className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-0 shadow-lg rounded-lg hover:shadow-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">{stats.totalCustomers}</p>
                  <p className="text-gray-600 text-sm mt-1">Total Customers</p>
                  <div className="flex items-center mt-1">
                    <LuArrowUpRight className="w-5 h-5 text-green-600 mr-2" />
                    <p className={`text-sm font-semibold ${stats.customerGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {stats.customerGrowth >= 0 ? '+' : ''}
                      {stats.customerGrowth} %
                    </p>

                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <LuUser className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-0 shadow-lg rounded-lg hover:shadow-2xl bg-gradient-to-br from-pink-50 to-rose-50">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">{stats.activeCustomers}</p>
                  <p className="text-gray-600 text-sm mt-1">Active Customers</p>
                  <p className="text-pink-600 text-sm font-semibold mt-1">
                    {(stats.activeCustomers / stats.totalCustomers * 100).toFixed(1)}% of Total
                  </p>
                </div>
                <div className="p-3 bg-pink-100 rounded-2xl">
                  <LuActivity className="w-8 h-8 text-pink-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-0 shadow-lg rounded-lg hover:shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">₹{stats.avgOrderValue}</p>
                  <p className="text-gray-600 text-sm mt-1">Avg. Order Value</p>
                  <div className="flex items-center mt-1">
                    <LuArrowUpRight className="w-5 h-5 text-green-600 mr-2" />
                    <p
                      className={`text-sm font-semibold ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      {stats.revenueGrowth >= 0 ? '+' : ''}
                      {stats.revenueGrowth} %
                    </p>

                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-2xl">
                  <LuIndianRupee className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border-0 shadow-lg">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300 overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold text-gray-900" sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                  <TableCell className="font-semibold text-gray-900" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell className="font-semibold text-gray-900" sx={{ fontWeight: 'bold' }}>Orders</TableCell>
                  <TableCell className="font-semibold text-gray-900" sx={{ fontWeight: 'bold' }}>Total Spent</TableCell>
                  <TableCell className="font-semibold text-gray-900" sx={{ fontWeight: 'bold' }}>Last Order</TableCell>
                  <TableCell className="font-semibold text-gray-900" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterCustomer.map((order) => (
                  <TableRow key={order._id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <p className="font-medium text-gray-900">
                          {order.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{order.email}</TableCell>
                    <TableCell className="font-medium text-gray-900">{order.totalOrders}</TableCell>
                    <TableCell className="font-semibold text-gray-900">
                      ₹ {order.totalAmount}
                    </TableCell>
                    <TableCell className="text-gray-600">  {new Date(order.latestOrderDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</TableCell>
                    <TableCell>
                      <button className="hover:bg-gray-100 p-1.5 rounded">
                        <LuEye className="w-4 h-4 text-gray-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect('mongodb://localhost:27017/codewears');
  }

  const now = new Date();
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const firstDay2MonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  // 1. Total customers (grouped by email)
  const Fetchorders = await Order.aggregate([
    {
      $group: {
        _id: '$email',
        name: { $first: '$name' },
        phone: { $first: '$phone' },
        latestOrderDate: { $max: '$createdAt' },
        totalOrders: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $project: {
        _id: 0,
        email: '$_id',
        name: 1,
        phone: 1,
        latestOrderDate: 1,
        totalOrders: 1,
        totalAmount: 1
      }
    },
    { $sort: { latestOrderDate: -1 } }
  ]);

  // 2. Calculate revenue for this month and last month
  const thisMonthRevenueAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: firstDayThisMonth } } },
    { $group: { _id: null, revenue: { $sum: '$amount' } } }
  ]);

  const lastMonthRevenueAgg = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: firstDayLastMonth,
          $lt: firstDayThisMonth
        }
      }
    },
    { $group: { _id: null, revenue: { $sum: '$amount' } } }
  ]);

  const thisMonthRevenue = thisMonthRevenueAgg[0]?.revenue || 0;
  const lastMonthRevenue = lastMonthRevenueAgg[0]?.revenue || 0;

  const newCustomersThisMonth = Fetchorders.filter(
    (c) => new Date(c.firstOrderDate) >= firstDayThisMonth
  ).length;

  const newCustomersLastMonth = Fetchorders.filter(
    (c) =>
      new Date(c.firstOrderDate) >= firstDayLastMonth &&
      new Date(c.firstOrderDate) < firstDayThisMonth
  ).length;

  const revenueGrowth = lastMonthRevenue
    ? (((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
    : thisMonthRevenue > 0
      ? 100
      : 0;

  const customerGrowth = newCustomersLastMonth
    ? (((newCustomersThisMonth - newCustomersLastMonth) / newCustomersLastMonth) * 100).toFixed(1)
    : newCustomersThisMonth > 0
      ? 100
      : 0;

  return {
    props: {
      customers: JSON.parse(JSON.stringify(Fetchorders)),
      stats: {
        totalCustomers: Fetchorders.length,
        activeCustomers: Fetchorders.length, // You can add filter logic here
        avgOrderValue: Math.round(
          Fetchorders.reduce((acc, c) => acc + c.totalAmount, 0) / Fetchorders.length
        ),
        revenueGrowth,
        thisMonthRevenue,
        customerGrowth
      }
    }
  };
}


export default withAdminAuth(Customers);
