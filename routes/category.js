const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { addcategoryValidator, idvalidator } = require("../validation/category");
const validate = require("../validation/validate");
const isAuth = require("../middleware/isAuthucation");
const isAdmin = require("../middleware/isAdmin");
// Create the category

router.post(
  "/add-category",
  isAuth,
  isAdmin,
  addcategoryValidator,
  validate,
  categoryController.addcategory
);
router.put(
  "/:id",
  isAuth,
  isAdmin,
  idvalidator,
  categoryController.updateCategory
);
router.delete("/:id", isAuth, isAdmin, categoryController.deleteCategory);
router.get("/", isAuth, categoryController.Searchcategory);
router.get(
  "/:id",
  isAuth,
  idvalidator,
  validate,
  categoryController.getcategory
);

module.exports = router;
