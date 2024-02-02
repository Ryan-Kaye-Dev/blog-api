const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

///////////////// ROUTES /////////////////////////

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/posts");
});

/////////// POST CONTROLLER //////////////////////

// read/get all posts - api/posts
router.get("/posts", post_controller.post_list);

// create post - api/posts
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_create
);

// read/get post - api/posts/:id
router.get("/posts/:id", post_controller.post_detail);

// update post - api/posts/:postid
router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_update
);

// delete post - api/posts/:postid
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_delete
);

/////////////////////// COMMENT ROUTES ////////////////////////////////

// create comment - api/posts/:postid/comments
router.post("/posts/:postid/comments", comment_controller.comment_create);

// read/get all comments - api/posts/:postid/comments
router.get("/posts/:postid/comments", comment_controller.comment_list);

// read/get single comment - api/posts/:postid/comments/:commentid
router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_detail
);

// DELETE ALL POST COMMENTS
router.delete(
  "/posts/:postid/comments",
  passport.authenticate("jwt", { session: false }),
  comment_controller.comment_delete_all
);

// delete comment - api/posts/:postid/comments/:commentid
router.delete(
  "/posts/:postid/comments/:commentid",
  passport.authenticate("jwt", { session: false }),
  comment_controller.comment_delete
);

/////////////////////////////// USER CONTROLLER ///////////////////////////

// create author - api/signup
router.post("/sign-up", user_controller.signup);

// login - api/login
router.post("/login", user_controller.login);

// logout - api/logout
router.get("/logout", user_controller.logout);

module.exports = router;
