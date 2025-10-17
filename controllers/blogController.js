const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

// Render add blog page
exports.addBlogPage = (req, res) => {
  res.render("pages/add-blog", { error: null });
};

// Add new blog
exports.addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id; // logged-in user
    let image = null;

    if (req.file) {
      image = req.file.path; // multer file upload
    }

    await Blog.create({ title, content, author, image });
    res.redirect("/blog");
  } catch (err) {
    res.render("pages/add-blog", { error: err.message });
  }
};

// List all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.render("pages/blogs", { blogs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.editBlogPage = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).send("Blog not found");

    res.render("pages/edit-blog", { blog });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle blog update
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    await Blog.findByIdAndUpdate(blogId, { title, content }, { new: true });

    res.redirect("/blog/view");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);
    res.redirect("/blog/view"); // redirect to the view blogs page
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.viewBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email").sort({ createdAt: -1 });
    res.render("pages/view-blog", { blogs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};