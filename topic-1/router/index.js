const express = require("express");
const router = express.Router();
const auth = require("./auth");
const classRouter = require("./class");
const studentRouter = require("./student");

router.use("/auth", auth);
router.use("/classes", classRouter);
router.use("/students", studentRouter);

module.exports = router;
