const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.render("pages/register", { error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res.redirect("/pages/login");
  } catch (err) {
    res.render("pages/register", { error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render("pages/login", { error: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.render("pages/login", { error: "Invalid Email or Password" });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    res.redirect("/dashboard");
  } catch (err) {
    res.render("pages/login", { error: err.message });
  }
};
exports.homePage = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")  
      .sort({ createdAt: -1 });

    
    res.render("dashboard/index", { blogs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.viewUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.render("pages/view-users", { users }); 
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.redirect("/pages/view-users");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
