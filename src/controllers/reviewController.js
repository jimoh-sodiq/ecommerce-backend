import { StatusCodes } from 'http-status-codes'
import Review from "../models/reviewModel.js"
import { createResponse } from '../utils/global.js'
import Product from "../models/productModel.js";
import BadRequest from '../errors/bad-request.js';
import NotFoundError from '../errors/notfound-error.js';
import { checkPermissions } from '../utils/checkPermissions.js';



export async function createReview(req, res) {

    const {product: productId}  = req.body
    const isValidProduct = await Product.findOne({_id: productId})
    if(!isValidProduct){
        throw new BadRequest("product not found")
    }

    const alreadyReviewed = await Review.findOne({product: productId, user:req.user.userId})
    if(alreadyReviewed){ 
        throw new BadRequest("already reviewed product")
    }
    req.body.user = req.user.userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json(createResponse(true, {review}, "review created successfully"))
}

export async function getAllReviews(req, res) {
    const reviews = await Review.find({})
    res.status(StatusCodes.OK).json(createResponse(true, {reviews,count: reviews.length}, "reviews fetched successfully"))
}


export async function getSingleReview(req, res) {
    const reviewId = req.params.id
    const review  = await Review.findOne({_id: reviewId})
    if(!review){
        throw new NotFoundError("review not found")
    }
    res.status(StatusCodes.OK).json(createResponse(true, {review}, "review fetched successfully"))
}

export async function updateReview(req, res) {
    const {rating, comment, title} = req.body
    const reviewId = req.params.id
    const review  = await Review.findOne({_id: reviewId})
    console.log(review)
    if (!review) {
        throw new NotFoundError("review not found")
    }
    checkPermissions(req.user, review.user)
    review.comment = comment ?? review.comment
    review.title = title ?? review.title
    review.rating = rating ?? review.rating
    await review.save()
    return res.status(StatusCodes.OK).json(createResponse(true, {review}, "review updated successfully"))
}

export async function deleteReview(req, res) {
    const reviewId = req.params.id
    const review  = await Review.findOne({_id: reviewId})
    if(!review){
        throw new NotFoundError("review not found")
    }
    checkPermissions(req.user, review.user)
    await review.remove()
    
    res.status(StatusCodes.OK).json(createResponse(true, {review}, "review deleted successfully"))

}
