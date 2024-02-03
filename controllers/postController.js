const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

exports.post_list = async function (req, res, next) {
  try {
    const posts = await Post.find().populate("author");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.post_create = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
      });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  },
];

exports.post_detail = async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.post_update = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (req.user._id.toString() !== post.author.toString()) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const updatedPost = new Post({
        title: req.body.title,
        content: req.body.content,
      });
      await Post.findByIdAndUpdate(req.params.id, updatedPost);
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  },
];

exports.post_delete = async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (req.user._id.toString() !== post.author.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};
