const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addcategoryValidator = [
  check("title").notEmpty().withMessage("Title is required"),
];

const idvalidator = [
  param(":id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw " Invailed Category ID";
    }
  }),
];

module.exports = { addcategoryValidator, idvalidator };
