import { mongoose } from "mongoose";

const singleOrderItem = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    amount: {type: Number, required: true},
    product: {type: mongoose.Schema.ObjectId, ref: 'Product', required: true}
})

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true
    },
    shippingFee: {
      type: Number,
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    orderItems: [],
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid','shipped', 'delivered', 'failed', 'cancelled']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
