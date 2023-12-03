import Product from "../models/productModel.js"

export async function getAllProducts(req, res) {
   return res.send("hello product controller")
}

export async function createProduct(req, res) {
   return res.send("createProduct")
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