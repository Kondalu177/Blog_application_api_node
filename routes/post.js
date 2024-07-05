const express = require("express");
const isAuth = require("../middleware/isAuthucation");
const { postController } = require("../controllers");
const {
  addPostValidator,
  updatePostValidator,
  idvalidator,
} = require("../validation/postValidate");
const validate = require("../validation/validate");

const router = express.Router();

router.post(
  "/",
  isAuth,
  addPostValidator,
  validate,
  postController.postdetails
);
// Post Update route

router.put(
  "/:id",
  isAuth,
  updatePostValidator,
  idvalidator,
  postController.updatePost
);

// post Delete route

router.delete("/:id", idvalidator, validate, postController.deletePost);

// Get Post Data routes

router.get("/", isAuth, postController.getPost);

// single get post

router.get("/:id", isAuth, idvalidator, validate, postController.getPosts);

module.exports = router;
