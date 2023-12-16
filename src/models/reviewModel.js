import { mongoose } from "mongoose";
import User from "./userModel.js";
import Product from "./productModel.js";

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please enter a rating"],
      min: [1, "rating must be between 1 and 5"],
      max: [5, "rating must be between 1 and 5"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please enter a review title"],
      maxLength: [100, "review title cannot exceed 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please enter a review title"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// a user can only create one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const aggregateResult  = await this.aggregate([
    {
      $match: {
        'product': productId
      },
    },
    {
      '$group': {
        '_id': null,
        'averageRating': {
          '$avg': '$rating'
        },
        'numOfReviews': {
          '$sum': 1
        }
      }
    }
  ])
  
 try{
  await this.model('Product').findOneAndUpdate({_id: productId}, {
    averageRating: Math.ceil(aggregateResult[0]?.averageRating || 0),
    numOfReviews: aggregateResult[0]?.numOfReviews || 0,
  })
 } catch(error) {
  console.log(error)
 }
}

ReviewSchema.post('save', async function (next){
  await this.constructor.calculateAverageRating(this.product)
   console.log("saved a review")
})

ReviewSchema.post('remove', async function (next){
  await this.constructor.calculateAverageRating(this.product)
   console.log("removed a review")
})

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
