import mongoose from "mongoose";
import Review from "../models/review.model.js";

export const addReviewService = async (userId, productId, rating, comment)=>{
    const review = await Review.create({
        user: userId,
        product:productId,
        rating,
        comment,
    });
    return review;
}

export const getProductReviewService = async (productId)=>{
    return await Review.find({product:productId}).populate("user", "name").sort({createdAt:-1})
}

export const updateReviewService = async (reviewId, userId, rating, comment)=>{
    return await  Review.findOneAndUpdate({
        user:reviewId,
        user:userId,
    },
    {
        rating,
        comment
    },
    {
        new:true,
        runValidators:true
    }
)
}

export const deleteReviewService = async (reviewId, userId)=>{
    return await Review.findOneAndDelete({
        _id:reviewId,
        user:userId
    })
}

export const getProductRatingService = async (productId) =>{
    const result = await Review.aggregate([

        {
            $match:{
                product: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"},
                totalReviews:{$sum:1},
            }
        }
    ])
    return result[0] || {
        averageRating:0,
        totalReviews:0
    }
}