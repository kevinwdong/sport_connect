import Post from "../models/post.js";
import { errorHandler } from "../utils/error.js";

//@desc     Create a post
//@route    POST /posts/create
export const createPost = async (req, res, next) => {
  try {
    const {
      userId,
      userImage,
      firstName,
      lastName,
      description,
    } = req.body;

    const postImage = req.file ? req.file.filename : null;

    const newPost = new Post({
      userId,
      userImage,
      firstName,
      lastName,
      description,
      postImage: postImage,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Get all posts
//route    GET /posts
export const getFeedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Get a user's posts
//@route    GET /posts/:userId/posts
export const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Like a post
//@route    PATCH /posts/:id/like
export const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Update a post comments
//@route    PUT /posts/update/:postId/comments
export const updatePostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comments } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: req.body } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

//@desc     Delete a post
//@route    DELETE /posts/delete/:postId
export const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

//@desc     Delete a user's posts
//@route    DELETE /posts/delete/:userId/posts
export const deleteUserPost = async (req, res, next) => {
  try {
    await Post.deleteMany({ userId: req.params.userId });
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

