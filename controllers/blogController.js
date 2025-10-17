const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");


exports.dashboard = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author").sort({ createdAt: -1 });
    res.render("dashboard/index", { blogs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.addBlogPage = (req, res) => {
  res.render("pages/add-blog", { error: null });
};


exports.addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id; 
    let image = null;

    if (req.file) {
      image = req.file.path;
    }

    await Blog.create({ title, content, author, image });
    res.redirect("/blog/view");
  } catch (err) {
    res.render("pages/add-blog", { error: err.message });
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


exports.editBlogPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    res.render("pages/edit-blog", { blog });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect("/blog/view");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blog/view");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.addComment = async (req, res) => {
  try {
    const user = req.user ? req.user.username : "Anonymous";
    const { text } = req.body;

    await Blog.findByIdAndUpdate(req.params.id, {
      $push: { comments: { user, text, date: new Date() } },
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.getMyArticles = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate("author", "username email");
    res.render("pages/myArticles", { blogs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
