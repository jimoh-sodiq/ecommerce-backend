import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  getCurrentUserOrder,
  getSingleOrder,
} from "../controllers/orderController.js";

import {
  authorizePermissions,
  authenticateUser,
} from "../middlewares/authentication.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders)
  .post(authenticateUser, createOrder);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrder);
router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

export default router;
