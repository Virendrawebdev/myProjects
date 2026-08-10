import { success } from "zod";
import { addReviewService, deleteReviewService, getProductRatingService, getProductReviewService, updateReviewService } from "../services/review.service.js";

export const addReview = async (req, res, next)=>{
    try{
   const review = await addReviewService(
    req.user._id,
    req.params.productId,
    req.body.rating,
    req.body.comment
   )

   return res.status(201).json({
    success:true,
    message:"Review add successfully",
    data:review
   })
    }catch(error){
        next(error)
    }
}

export const getProductReviews =async (req, res, next)=>{
    try{
    const reviews = await getProductReviewService(req.params.productId);

    return res.status(200).json({
        success:true,
        message:"Reviews fetched successfully",
        data: reviews
    })
    }catch(error){
        next(error)
    }
}

export const updateReview = async (req, res, next) =>{
    try{
        const review = await updateReviewService(
            req.params.reviewId,
            req.user._id,
            req.body.rating,
            req.body.comment,
        )

        if(!review){
            return res.status(404).json({
                success:false,
                message:"Review not found or unauthorized"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Review update succesfully",
            data:review
        })

    }
    catch(error){
     next(error)
    }
}

export const deleteReview = async (req, res, next)=>{
    try{
        const review = await deleteReviewService(
            req.params.reviewId,
            req.user._id
        )

        if(!review){
            return res.status(404).json({
                success:false,
                message:"Review not found or unuthorized",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Review deleted successfully"
        })

    }catch(error){
        next(error)
    }
}


export const getProductRating = async (req, res, next) =>{
    try{
        const rating = await getProductRatingService(req.params.productId)
     
        return res.status(200).json({
            success:true,
            message:"product rating fetched successfully",
            data:{
                averageRating:rating.averageRating,
                totalReviews:rating.totalReviews
            }
        })
    }catch(error){
        next(error)
    }
}