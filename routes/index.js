const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.redirect("/pages/login"));

router.use("/pages", require("./userRoutes"));
router.use("/dashboard", require("./dashboardRoutes"));
router.use("/blog", require("./blogRoutes"));

module.exports = router;
