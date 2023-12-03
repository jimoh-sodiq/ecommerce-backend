import express from "express";
import {
  updateUser,
  updateUserPassword,
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} from "../controllers/userController.js";
import {authorizePermissions, authenticateUser} from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route("/show").get(authenticateUser, showCurrentUser);
router.route("/update").patch(authenticateUser,updateUser);
router.route("/update-password").patch(authenticateUser,updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
