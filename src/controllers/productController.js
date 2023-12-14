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
   const products = await Product.find({})
   return res.status(StatusCodes.OK).json(createResponse(true, {products}, "Products fetched successfully"))
}

export async function getSingleProduct(req, res) {
   const {id: productId } = req.params
   const product = await Product.findOne({_id: productId}).populate({path: 'reviews', select: "rating title comment"})
   if(!product) {
      throw new NotFoundError(`No product found with id ${productId}`)
   }
   return res.status(StatusCodes.OK).json(createResponse(true, {product}, "Product fetched successfully"))
}

export async function updateProduct(req, res) {
   const {id: productId } = req.params
   const product = await Product.findOneAndUpdate({_id: productId}, req.body, {new: true, runValidators: true})
   if(!product) {
      throw new NotFoundError(`No product found with id ${productId}`)
   }
   return res.status(StatusCodes.OK).json(createResponse(true, {product}, "Product updated successfully"))
}

export async function deleteProduct(req, res) {
   const {id: productId } = req.params
   const product = await Product.findOne({_id: productId})
   if(!product) {
      throw new NotFoundError(`No product found with id ${productId}`)
   }
   await product.remove()
   return res.status(StatusCodes.OK).json(createResponse(true, null, "Product deleted successfully"))
}

export async function uploadImage(req, res) {
   return res.send("uploadImage")
}