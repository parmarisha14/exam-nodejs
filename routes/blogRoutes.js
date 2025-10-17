const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const blogController = require("../controllers/blogController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


router.get("/", auth, blogController.viewBlogs);
router.get("/add", auth, blogController.addBlogPage);
router.post("/add", auth, upload.single("image"), blogController.addBlog);

router.get("/edit/:id", auth, blogController.editBlogPage);
router.post("/edit/:id", auth, blogController.updateBlog);

router.get("/delete/:id", auth, blogController.deleteBlog);
router.get("/view", auth, blogController.viewBlogs);
router.post("/comment/:id", auth, blogController.addComment);


router.get("/my-articles", auth, blogController.getMyArticles);

module.exports = router;
