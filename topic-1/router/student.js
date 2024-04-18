const studentController = require("../controllers/student");
const express = require("express");
const router = express.Router();

router
    .route("/")
    .get(studentController.getAllStudents)
    .post(studentController.createStudent);

router
    .route("/:id")
    .get(studentController.getStudentById)
    .put(studentController.updateStudent)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router;
