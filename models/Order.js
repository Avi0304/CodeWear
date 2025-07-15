// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true
//     },
//     products: [{
//         productId: {
//             type: String
//         },
//         quantity: {
//             type: Number,
//             default: 1,
//         }
//     }],
//     address: {
//         type: String,
//         required: true
//     },
//      amount: {
//         type: Number,
//         required: true
//     },
//      status: {
//         type: String,
//         default: 'Pending',
//         required: true
//     },

// },{timestamps: true})

// export default mongoose.models.User || mongoose.model("Order", OrderSchema);

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        variant: {
          type: String,
          required: true
        },
        size: {
          type: String,
          required: true
        }
      },
    ],
    address: {
      line1: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    paymentIntentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    shippingStatus: {
      type:  String,
      default: 'unshipped'
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
