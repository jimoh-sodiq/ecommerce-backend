import Order from "../models/orderModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFoundError } from "../errors/index.js";
import { createResponse } from "../utils/global.js";

export async function createOrder(req, res) {

//   res.status(StatusCodes.CREATED).json(createResponse(order));
    res.send("create order");
}

export async function updateOrder(req, res) {
  res.send("update order");
}

export async function getCurrentUserOrder(req, res) {
  res.send("current user order");
}
export async function getSingleOrder(req, res) {
  res.send("get single order");
}
export async function getAllOrders(req, res) {
  res.send("get all order");
}

