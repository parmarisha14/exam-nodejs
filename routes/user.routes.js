const express = require("express");
const router = express.Router();
const { register, login, logout, registerPage, loginPage } = require("../controllers/userController");

router.get("/register", registerPage);
router.post("/register", register);
router.get("/login", loginPage);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
