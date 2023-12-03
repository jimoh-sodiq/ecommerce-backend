import express from "express";
import {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} from "../controllers/productController.js";
import {authorizePermissions, authenticateUser} from "../middlewares/authentication.js";


const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.route("/create").post(authorizePermissions('admin'),createProduct);
router.route("/update").patch(authorizePermissions('admin'),updateProduct);
router.route("/delete").delete(authorizePermissions('admin'),deleteProduct);
router.route("/upload-image").post(authorizePermissions('admin'),uploadImage);


export default router;
