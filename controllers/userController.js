const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerPage = (req, res) => res.render("pages/register");
module.exports.loginPage = (req, res) => res.render("pages/login");

module.exports.register = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);
    return res.redirect("/login");
  } catch (error) {
    return res.render("pages/register", { error: "Email already used!" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render("pages/login", { error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.render("pages/login", { error: "Wrong password" });

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("jwt", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("pages/login", { error: err.message });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
};
