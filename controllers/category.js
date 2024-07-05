const { category, User } = require("../models");
const addcategory = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const { _id } = req.user;

    const iscategoryExited = await category.findOne({ title });
    if (iscategoryExited) {
      res.code = 400;
      throw new Error(`Category already exists`);
    }
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error(`User not found`);
    }
    const newCategory = new category({ title, desc, updatedBy: _id });
    await newCategory.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Category added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update category

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { title, desc } = req.body;
    const iscategory = await category.findById(id);
    if (!iscategory) {
      res.code = 404;
      throw new Error("Category Not Found");
    }
    const categoryExited = await category.findOne({ title });
    if (
      categoryExited &&
      categoryExited.title === title &&
      String(categoryExited._id) !== String(category._id)
    ) {
      res.code = 400;
      throw new Error("Title Already Exited");
    }
    iscategory.title = title ? title : iscategory.title;
    iscategory.desc = desc;
    category.updatedBy = _id;
    await iscategory.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Category Updated Successfully",
      data: { iscategory },
    });
  } catch (error) {
    next(error);
  }
};
// Delete Controller

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Category = await category.findById(id);
    if (!Category) {
      res.code = 404;
      throw new Error(`Category Not Found`);
    }
    await category.findByIdAndDelete(id);

    res.status(200).json({
      code: 200,
      status: true,
      message: `Category deleted Successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const Searchcategory = async (req, res, next) => {
  try {
    const { q, size, page } = req.query;
    let query = {};
    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;
    if (q) {
      const search = RegExp(q, "i");
      query = { $or: [{ title: search }, { desc: search }] };
    }
    const total = await category.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const Categoies = await category
      .find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ updatedBy: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully get Category data",
      data: { Categoies, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Category = await category.findById(id);
    console.log(Category);
    if (!Category) {
      res.code = 404;
      throw new Error("Cannot find category");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Get the category successfully",
      data: { Category },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addcategory,
  updateCategory,
  deleteCategory,
  Searchcategory,
  getcategory,
};
