import Product from "../models/productModel.js"
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFoundError } from "../errors/index.js";
import { createResponse } from '../utils/global.js';


export async function createProduct(req, res) {
   req.body.user = req.user.userId
   const product = await Product.create(req.body)
   res.status(StatusCodes.CREATED).json(createResponse(true, {product}, "Product created successfully"))
}

export async function getAllProducts(req, res) {
   return res.send("hello product controller")
}



export async function getSingleProduct(req, res) {
   return res.send("getSingleProduct")
}
export async function updateProduct(req, res) {
   return res.send("hello updateProduct")
}
export async function deleteProduct(req, res) {
   return res.send("deleteProduct")
}
export async function uploadImage(req, res) {
   return res.send("uploadImage")
}