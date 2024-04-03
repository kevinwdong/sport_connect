import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost, updatePostComments } from "../controllers/postController.js";
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

//@desc    Create a post
router.post('/create', createPost);

//@desc    Get all posts
router.get("/", getFeedPosts);

//@desc    Get a user's posts
router.get("/:userId/posts", getUserPosts);

// @desc    Update a post
router.put("/update/:postId/comments", updatePostComments);

//@desc     Like a post
router.patch("/:id/like", likePost);


export default router;