import React, { useState } from 'react';
import Sidebar from './sideBar';
import { TextField, Box, FormControl, Button, InputAdornment, Table, TableHead, TableCell, TableRow, TableBody, Select, InputLabel, MenuItem, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LuDownload, LuEye, LuFileDown, LuFilter, LuSheet, LuX } from 'react-icons/lu';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import Head from 'next/head';
import withAdminAuth from '@/components/withAdminAuth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const AdminOrder = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('');



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
    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-');

    const matchesQuery = (
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

    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchesShipping = selectedShipping ? order.shippingStatus === selectedShipping : true;

    return matchesQuery && matchesStatus && matchesShipping;
  });


  const handleExportPdf = async () => {
    const doc = new jsPDF();
    doc.text('Order Report', 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [['Order ID', 'Customer', 'Email', 'Amount', 'Status', 'Shipping', 'Date']],
      body: filterOrder.map(order => [
        order._id.substring(0, 8),
        order.name,
        order.email,
        `₹ ${order.amount}`,
        order.status,
        order.shippingStatus,
        new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')
      ])
    });

    doc.save('orders.pdf');
  }

  const handleExportExcel = async () => {
    const data = filterOrder.map(order => ({
      'Order-ID': order._id.substring(0.8),
      'Customer': order.name,
      'Email': order.email,
      'Amount (₹)': order.amount,
      'Status': order.status,
      'Shipping': order.shippingStatus,
      'Date': new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order Details");

    const excelbuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelbuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'orders.xlsx');
  }




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
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              >
                <LuFilter className="w-4 h-4 mr-2" />
                Filter
              </button>


              {filterMenuOpen && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    mt: 2,
                    zIndex: 50,
                    width: 240,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div className='mb-3'>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <LuFilter className="w-4 h-4 mr-2 text-pink-500" />
                        Filter Orders
                      </h3>
                      <button
                        onClick={() => setFilterMenuOpen(false)}
                        className="text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-colors"
                      >
                        <LuX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Order Status */}
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel id="order-status-label">Order Status</InputLabel>
                    <Select
                      labelId="order-status-label"
                      value={selectedStatus}
                      label="Order Status"
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Shipping Status */}
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel id="shipping-status-label">Shipping Status</InputLabel>
                    <Select
                      labelId="shipping-status-label"
                      value={selectedShipping}
                      label="Shipping Status"
                      onChange={(e) => setSelectedShipping(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="unshipped">Unshipped</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
                    <Button
                      variant='ghost'
                      size="sm"
                      onClick={() => {
                        setSelectedStatus('');
                        setSelectedShipping('');
                        setFilterMenuOpen(false);
                      }}
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 h-9 px-4 font-medium"
                    >
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setFilterMenuOpen(false)}
                      className="bg-gradient-to-r  from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white h-9 px-6 font-medium shadow-lg shadow-pink-500/25"
                      sx={{color: 'white'}}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              )}
            </div>


            {/* Export Button */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
              >
                <LuDownload className="w-4 h-4 mr-2" />
                Export
              </button>
              {isOpen && (
                <div className="absolute right-10 mt-2 w-40 bg-gray-100 border border-gray-200 rounded shadow-2xl z-50">
                  <button className="w-full px-4 py-2 hover:cursor-pointer text-sm text-left hover:bg-gray-100 flex items-center font-semibold"
                    onClick={handleExportPdf}
                  >
                    <LuFileDown className="w-4 h-4 mr-2" />
                    Export As Pdf
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="w-full font-semibold hover:cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center"
                  >
                    <LuSheet className="w-4 h-4 mr-2" />
                    Export As Excel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-0 shadow-lg overflow-x-auto w-full">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300 w-full min-w-[800px] sm:min-w-full">
            <Table className="w-full table-auto text-sm sm:text-base">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Shipping</TableCell>
                  <TableCell className="font-bold text-center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
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

export default withAdminAuth(AdminOrder);
