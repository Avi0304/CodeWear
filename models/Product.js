const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,

    },
    color: {
        type: String,

    },
    price: {
        type: Number,
        required: true
    },
    avaiableQty: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Stock"
    }

}, { timestamps: true })


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
