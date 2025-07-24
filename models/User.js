const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    pincode: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin','customer'],
        default: 'customer'
    }

}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema);