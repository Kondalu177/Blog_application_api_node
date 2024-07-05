const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addPostValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw "Invalid file Id";
    }
  }),
  check("Category")
    .notEmpty()
    .withMessage("Category is required")
    .custom(async (Category) => {
      if (Category && !mongoose.Types.ObjectId.isValid(Category)) {
        throw "Invalid category Id";
      }
    }),
];

const updatePostValidator = [
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw "Invalid file Id";
    }
  }),
  check("Category")
    .notEmpty()
    .withMessage("Category is required")
    .custom(async (Category) => {
      if (Category && !mongoose.Types.ObjectId.isValid(Category)) {
        throw "Invalid category Id";
      }
    }),
];

const idvalidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "Invalid Post Id";
    }
  }),
];

module.exports = { addPostValidator, updatePostValidator, idvalidator };
