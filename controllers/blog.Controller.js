const Blog = require("../models/blogSchema");

module.exports.listBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("createdBy", "username");
  res.render("pages/index", { blogs, user: req.user });
};

module.exports.addBlogForm = (req, res) => {
  res.render("pages/addblog");
};

module.exports.addBlog = async (req, res) => {
  await Blog.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    createdBy: req.user._id
  });
  res.redirect("/");
};

module.exports.editBlogForm = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.createdBy.toString() !== req.user._id.toString())
    return res.status(403).send("Not authorized");
  res.render("pages/editblog", { blog });
};

module.exports.updateBlog = async (req, res) => {
  const { title, content, image } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog.createdBy.toString() !== req.user._id.toString())
    return res.status(403).send("Not authorized");
  await Blog.findByIdAndUpdate(req.params.id, { title, content, image });
  res.redirect("/");
};

module.exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.createdBy.toString() !== req.user._id.toString())
    return res.status(403).send("Not authorized");
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
