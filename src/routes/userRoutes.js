import { Router } from "express";
import {
  updateUser,
  updateUserPassword,
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} from "../controllers/userController.js";
import authenticateUser from "../middlewares/authentication.js";

const router = Router();

router.route("/").get(authenticateUser, getAllUsers);
router.route("/show").get(showCurrentUser);
router.route("/update").patch(updateUser);
router.route("/update-password").patch(updateUserPassword);
router.route("/:id").get(getSingleUser);

export default router;
