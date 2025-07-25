import React, { useState } from 'react'
import Sidebar from './sideBar'
import { TextField, InputAdornment, Table, TableHead, TableCell, TableRow, TableBody, LinearProgress, Drop } from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LuPlus, LuStar } from 'react-icons/lu';
import mongoose from 'mongoose';
import Product from '@/models/Product';
import Head from 'next/head';
import withAdminAuth from '@/components/withAdminAuth';
import { toast, Bounce } from 'react-toastify';



const Products = ({ products }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        slug: "",
        desc: "",
        img: "",
        category: '',
        size: '',
        price: '',
        color: '',
        avaiableQty: '',
        status: 'stock',
    });



    const getStatusColor = (status) => {
        switch (status) {
            case "stock":
                return "bg-green-100 text-green-700 border-green-200"
            case "low stock":
                return "bg-orange-100 text-orange-700 border-orange-200"
            case "out of stock":
                return "bg-red-100 text-red-700 border-red-200"
            default:
                return "bg-gray-100 text-gray-700 border-gray-200"
        }
    }

    const filterProduct = products.filter((product) => {

        const query = searchQuery.toLowerCase();

        return (
            product.title.toLowerCase().includes(query) ||
            product._id.toLowerCase().includes(query) ||
            product.status.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.status.toLowerCase().includes(query) ||
            product.price.toString().toLowerCase().includes(query) ||
            product.avaiableQty.toString().toLowerCase().includes(query)
        )
    })


    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Product data in form: ", newProduct);


        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproduct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });

        if (res.ok) {
            toast.success('Product Added Sucessfully...', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setOpen(false);
            setNewProduct({ title: '', category: '', price: '', avaiableQty: '', img: '', status: 'stock', slug: '', size: '', color: '', desc: '' });

        }
    };



    return (
        <Sidebar>
            <Head>
                <title>CoderWear.com - Admin - Products</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Admin dashboard to manage product inventory and stock status for CoderWear.com." />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className='font-bold text-2xl text-gray-900'>Products</h2>
                        <p className='text-gray-600 mt-1'>Manage your product catalog and inventory</p>
                    </div>

                    <div className='flex flex-wrap gap-3 items-center'>
                        <TextField
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="outlined"
                            size="small"
                            placeholder="Search Products..."
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

                        <button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg shadow-pink-500/25 p-1.5 text-white rounded-lg flex items-center hover:cursor-pointer" onClick={() => setOpen(true)}>
                            <LuPlus className='w-4 h-4 mr-2' />
                            Add Product
                        </button>
                    </div>

                </div>
                <div className='border-0 shadow-lg overflow-x-auto w-full'>
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:cursor-pointer hover:shadow-2xl transition duration-300 min-w-[800px] sm:min-w-full">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                                    <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                    <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                    <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                                    {/* <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Sales</TableCell>
                                    <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Rating</TableCell> */}
                                    <TableCell className="font-bold" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterProduct.map((product) => (
                                    <TableRow key={product.id} className="border-gray-100 hover:bg-gray-50/50">
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.title.substring(0, 25)}...</p>
                                                <p className="text-xs text-gray-500">ID: {product._id.substring(0, 8)}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="border-gray-200 text-gray-700">
                                                {product.category}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-gray-900">₹ {product.price}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.avaiableQty}</p>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={product.avaiableQty > 20 ? 100 : (product.avaiableQty / 20) * 100}
                                                    sx={{ width: 64, height: 6, borderRadius: '4px', marginTop: '0.25rem' }}
                                                />
                                            </div>
                                        </TableCell>
                                        {/* <TableCell className="text-gray-700">{product.sold}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-1">
                                                <LuStar className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                                            </div>
                                        </TableCell> */}
                                        <TableCell>
                                            <div className={`${getStatusColor(product.status)} border rounded-lg px-2 py-1 text-xs font-bold inline-block`}>
                                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogContent className="space-y-4">
                        <TextField
                            label="Title"
                            name="title"
                            fullWidth
                            value={newProduct.title}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Slug"
                            name="slug"
                            fullWidth
                            value={newProduct.slug}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Description"
                            name="desc"
                            fullWidth
                            value={newProduct.desc}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Image"
                            name="img"
                            fullWidth
                            value={newProduct.img}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Category"
                            name="category"
                            fullWidth
                            value={newProduct.category}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Size"
                            name="size"
                            fullWidth
                            value={newProduct.size}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Color"
                            name="color"
                            fullWidth
                            value={newProduct.color}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            value={newProduct.price}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Available Quantity"
                            name="avaiableQty"
                            type="number"
                            fullWidth
                            value={newProduct.avaiableQty}
                            onChange={handleChange}
                            margin='dense'
                        />
                        <TextField
                            label="Status"
                            name="status"
                            select
                            fullWidth
                            value={newProduct.status}
                            onChange={handleChange}
                            margin='dense'
                        >
                            <MenuItem value="stock">Stock</MenuItem>
                            <MenuItem value="low stock">Low Stock</MenuItem>
                            <MenuItem value="out of stock">Out of Stock</MenuItem>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{
                            background: 'linear-gradient(to right, #db2777, #e11d48)',
                            color: 'white',
                            borderRadius: 2,
                            '&:hover': {
                                background: 'linear-gradient(to right, #ec4899, #f43f5e)'
                            }
                        }}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </Sidebar>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect('mongodb://localhost:27017/codewears');
    }

    let FetchProducts = await Product.find({});
    return {
        props: { products: JSON.parse(JSON.stringify(FetchProducts)) }
    }
}

export default withAdminAuth(Products);