import express from "express"
import {
    authorizePermissions,
    authenticateUser,
  } from "../middlewares/authentication.js";
  
import { getAllReviews, getSingleReview, updateReview, deleteReview, createReview } from '../controllers/reviewController.js'


const router = express.Router()

router.route('/').get(getAllReviews).post(authenticateUser, createReview)
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);


export default router