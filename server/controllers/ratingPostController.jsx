const User = require("../models/user");
const UserModel = require("../models/user");
const RatingPostModel = require("../models/ratingPost");

// Create new rating post
const createRatingPost = async (req, res) => {
    console.log("Creating rating post");
    try {
        const { userId, trailId, rating } = req.body;

        // Check if a review post already exists for the given user and trail
        const existingReviewPost = await RatingPostModel.findOne({ userId, trailId });
        if (existingReviewPost) {
            return res.status(400).json({ error: "You have already reviewed this trail" });
        }

        // Create a new review post
        const newReviewPost = new RatingPostModel({
            userId,
            trailId,
            rating,
        });

        await newReviewPost.save();

        // Update the user's review posts
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { reviewPosts: newReviewPost._id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({ newReviewPost });
    } catch (error) {
        res.status(500).json({ error: "Failed to create rating post" });
    }
};

// Get rating post by ID
const getRatingPost = async (req, res) => {
    try {
        const { ratingPostId } = req.body;
        const ratingPosts = await RatingPostModel.findById(ratingPostId);
        res.status(200).json(ratingPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete rating post
const deleteRatingPost = async (req, res) => {
    console.log("deleteRatingPost called");
    try {
        const { userId, reviewPostId } = req.body;
        const post = await RatingPostModel.findByIdAndDelete(reviewPostId);
        if (!post) {
            return res.status(404).json({ message: "Review post not found" });
        }

        // Update the user's review posts
        await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { reviewPosts: reviewPostId } },
            { new: true }
        );

        res.status(200).json({ message: "Review post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete rating post" });
    }
};

// Handle exports to other parts of the application
module.exports = {
    createRatingPost,
    getRatingPost,
    deleteRatingPost,
};
