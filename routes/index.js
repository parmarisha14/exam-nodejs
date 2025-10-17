const { Router } = require("express");
const router = Router();
const userRoutes = require("./user.routes");

router.get("/", (req, res) => res.redirect("/pages/login"));
router.use("/pages", userRoutes);
router.use("/blog", require("./blog.routes"));

module.exports = router;