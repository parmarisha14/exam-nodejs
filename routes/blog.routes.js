const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

router.get("/", blogController.listBlogs);
router.get("/add", auth, blogController.addBlogForm);
router.post("/add", auth, blogController.addBlog);
router.get("/edit/:id", auth, blogController.editBlogForm);
router.post("/edit/:id", auth, blogController.updateBlog);
router.get("/delete/:id", auth, blogController.deleteBlog);

module.exports = router;
