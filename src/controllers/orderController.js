import { Order, SingleOrderItem } from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFoundError } from "../errors/index.js";
import { createResponse } from "../utils/global.js";
import { checkPermissions } from '../utils/checkPermissions.js';

const fakeStripeApi = async ({ amount, currency }) => { 
  const clientSecret = "arandomclientsecret"
  return {clientSecret, amount}
}

export async function createOrder(req, res) {
  const { orderItems, tax, shippingFee } = req.body;
  if (!orderItems || orderItems.length < 1) {
    throw new BadRequest("No order items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequest("Please provide tax and shipping fee");
  }

  let orderItemsHolder = [];
  let subTotal = 0;

  const revampOrderItems = await Promise.all(
    orderItems.map(async (item) => {
      const dbProduct = await Product.findOne({ _id: item.product });
      if (!dbProduct) {
        throw new NotFoundError(`No product with id ${item.product}`);
      }
      const { name, price, image, _id: productId } = dbProduct;
      const singleOrderItem = {
        quantity: item.quantity,
        name,
        price,
        image,
        product: productId,
      };
      return singleOrderItem;
    })
  );

  subTotal = revampOrderItems.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);console.log(subTotal);
  }, 0);
  const total = subTotal + tax + shippingFee

  // GET CLIENT SECRET
  const paymentIntent  = await fakeStripeApi({
    amount: total, currency: "NGN"
  })
  const order = await Order.create({
    tax,
    shippingFee,
    subTotal,
    total,
    orderItems: revampOrderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.clientSecret,
  });

    res.status(StatusCodes.CREATED).json(createResponse(true, {order, clientSecret: order.clientSecret}));
}

export async function getAllOrders(req, res) {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json(createResponse(true, {orders, count: orders.length}, "orders retrieved successfully"));
}


export async function getCurrentUserOrder(req, res) {
  const userId = req.user.userId;
  const orders = await Order.find({ user: userId })
  res.status(StatusCodes.OK).json(createResponse(true, {orders, count: orders.length}, "orders retrieved successfully"));
}


export async function getSingleOrder(req, res) {
  const orderId = req.params.id
  const order = await Order.findOne({_id:orderId})
  if(!order) {
    throw new NotFoundError("order not found")
  }
  checkPermissions(req.user, order.user)
  res.status(StatusCodes.OK).json(createResponse(true, {order}, "order retrieved successfully"));
}


export async function updateOrder(req, res) {
  const {paymentIntentId} = req.body
  const orderId = req.params.id
  const userId = req.user.userId;

  const order = await Order.findOne({_id:orderId})
  if(!order) {
    throw new NotFoundError("order not found")
  }
  checkPermissions(req.user, order.user)
  order.paymentId = paymentIntentId
  order.status = 'paid'
  await order.save()
  res.status(StatusCodes.OK).json(createResponse(true, {order}, "order updated successfully"));

}