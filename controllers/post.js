const { File, Post, category } = require("../models");
const postdetails = async (req, res, next) => {
  try {
    const { title, desc, file, Category } = req.body;
    const { _id } = req.user;

    // if (file) {
    //   const isfileExite = await File.findById(file);
    //   if (!isfileExite) {
    //     res.code = 404;
    //     throw new Error("File Not Found");
    //   }
    // }

    const isCategoryDExites = await category.findById(Category);

    if (!isCategoryDExites) {
      res.code = 404;
      throw new Error("Category Not Found");
    }
    const newPost = new Post({
      title,
      desc,
      //   file,
      Category,
      updatedBy: _id,
    });
    await newPost.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "Post Added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// update post controller
const updatePost = async (req, res, next) => {
  try {
    const { title, desc, file, Category } = req.body;
    const { id } = req.params;
    const { _id } = req.user;

    // if (file) {
    //   const isfileExite = await File.findById(file);
    //   if (!isfileExite) {
    //     res.code = 404;
    //     throw new Error("File Not Found");
    //   }
    // }

    if (Category) {
      const CategoryExites = await category.findById(Category);
      console.log(CategoryExites);
      if (!CategoryExites) {
        res.code = 404;
        throw new Error("Category Not Found");
      }
    }
    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("Post Not Found");
    }
    post.title = title ? title : post.title;
    post.desc = desc;
    // post.file = file;
    post.Category = Category ? Category : post.Category;
    post.updatedBy = _id;
    await post.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete post controller

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("Post Not Found");
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
// get post controller
const getPost = async (req, res, next) => {
  try {
    const { page, size, q, Category } = req.query;
    const pageNumber = parseInt(page) || 1;
    const sizeNumber = parseInt(size) || 10;
    let query = {};
    if (q) {
      const search = new RegExp(q, "i");
      query = {
        $or: [{ title: search }],
      };
    }
    if (Category) {
      query = { ...query, Category };
    }
    console.log(query);
    const total = await Post.countDocuments(query);
    const pages = await Math.ceil(total / sizeNumber);

    const posts = await Post.find(query)
      .sort({ updatedBy: -1 })
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Get Post list successfully",
      data: { posts, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

// single get post

const getPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("Post Not Found");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: " Get post successfully",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { postdetails, updatePost, deletePost, getPost, getPosts };
