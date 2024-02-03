const Comment = require("../models/comment");
const mongoose = require("mongoose");

exports.comment_create = function (req, res, next) {
  const newComment = new Comment({
    name: req.body.name,
    content: req.body.content,
    post: req.params.id,
  });
  newComment.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(newComment);
  });
};

exports.comment_detail = function (req, res, next) {
  Comment.findById(req.params.commentid, function (err, comment) {
    if (err) {
      return next(err);
    }
    if (comment === null) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  });
};

exports.comment_list = function (req, res, next) {
  Comment.find({ post: req.params.postid }, function (err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
};

exports.comment_delete = function (req, res, next) {
  Comment.findByIdAndRemove(req.params.commentid, function (err, comment) {
    if (err) {
      return next(err);
    }
    if (comment === null) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  });
};

exports.comment_delete_all = function (req, res, next) {
  Comment.deleteMany({ post: req.params.postid }, function (err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
};
