import React, { useState } from 'react';
import Sidebar from './sideBar';
import { TextField, InputAdornment, Table, TableHead, TableCell, TableRow, TableBody, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LuDownload, LuEye, LuFilter } from 'react-icons/lu';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import Head from 'next/head';


const AdminOrder = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState("");


  const getShippingColor = (status) => {
    switch (status) {
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "unshipped":
        return "bg-red-100 text-red-700 border-red-200";
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filterOrder = orders.filter((order) => {
    const query = searchQuery.toLowerCase();

    const formattedDate = new Date(order.createdAt)
      .toLocaleDateString('en-GB')
      .replace(/\//g, '-');

    return (
      order._id.toLowerCase().includes(query) ||
      order.name.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query) ||
      order.shippingStatus.toLowerCase().includes(query) ||
      order.amount.toString().includes(query) ||
      formattedDate.includes(query) ||
      order.products?.some((product) =>
        product.name?.toLowerCase().includes(query)
      )
    );
  });




  return (
    <Sidebar>
      <Head>
        <title>CoderWear.com - Admin - Orders</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Admin dashboard to manage product inventory and stock status for CoderWear.com." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
          </div>

          {/* Right: Search + Actions */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search Bar */}
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Search orders..."
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

            {/* Filter Button */}
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
            >
              <LuFilter className="w-4 h-4 mr-2" />
              Filter
            </button>

            {/* Export Button */}
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
            >
              <LuDownload className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

     <div className="border-0 shadow-lg overflow-x-auto w-full">
  <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300 w-full min-w-[800px] sm:min-w-full">
    <Table className="w-full table-auto text-sm sm:text-base">
      <TableHead>
        <TableRow>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Order ID</TableCell>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Customer</TableCell>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Product</TableCell>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Amount</TableCell>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Status</TableCell>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Shipping</TableCell>
          <TableCell className="font-bold text-center" sx={{fontWeight: 'bold'}}>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filterOrder.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="text-center">{order._id.substring(0, 8)}</TableCell>
            <TableCell className="text-center">
              <p className="font-medium text-gray-900">{order.name}</p>
              <p className="text-xs text-gray-500">{order.email}</p>
            </TableCell>
            <TableCell className="text-center">
              {order.products?.map((p, i) => (
                <span key={i}>
                  {p.name?.substring(0, 25) ?? "Unnamed Product"}
                  {i !== order.products.length - 1 && ", "}
                </span>
              )) || "No products"}
            </TableCell>
            <TableCell className="text-center">₹ {order.amount}</TableCell>
            <TableCell className="text-center">
              <div className={`${getShippingColor(order.status)} border rounded-lg px-2 py-1 text-xs font-bold inline-block`}>
                {order.status}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div className={`${getShippingColor(order.shippingStatus)} border rounded-lg px-2 py-1 text-xs font-bold inline-block`}>
                {order.shippingStatus}
              </div>
            </TableCell>
            <TableCell className="text-center">
              {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
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

  let fetchOrders = await Order.find({});
  return {
    props: { orders: JSON.parse(JSON.stringify(fetchOrders)) }
  }
}

export default AdminOrder;
