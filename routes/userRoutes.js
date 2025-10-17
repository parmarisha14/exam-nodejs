const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/login", (req, res) => res.render("pages/login", { error: null }));
router.get("/register", (req, res) => res.render("pages/register", { error: null }));

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/", auth, userController.homePage);

router.get("/view-users", auth, userController.viewUsers);

router.get("/delete/:id", auth, userController.deleteUser);

module.exports = router;
