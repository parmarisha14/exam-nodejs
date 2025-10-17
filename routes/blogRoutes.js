const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth"); 
const blogController = require("../controllers/blogController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });


router.get("/", auth, blogController.getAllBlogs);
router.get("/add", auth, blogController.addBlogPage);
router.post("/add", auth, upload.single("image"), blogController.addBlog);
router.get("/edit/:id", auth, blogController.editBlogPage);
router.post("/edit/:id", auth, blogController.updateBlog);
router.get("/delete/:id", auth, blogController.deleteBlog);
router.get("/view", auth, blogController.viewBlogs); 
module.exports = router;
