const express = require("express");
const router = express.Router();
const classController = require("../controllers/class");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(["admin", "user"]), classController.getAllClasses)
    .post(authMiddleware(["admin"]), classController.createClass);

router
    .route("/:id")
    .get(authMiddleware(["admin", "user"]), classController.getClassById)
    .put(authMiddleware(["admin"]), classController.updateClass)
    .delete(authMiddleware(["admin"]), classController.deleteClass);

module.exports = router;
