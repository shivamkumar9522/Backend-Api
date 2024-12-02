const express = require("express");
const router = express.Router();
const studentController = require("../controller/student");
router.post("/create", studentController.newStudent);
router.get("/AllStudent", studentController.getAllStudent);
router.get("/Student/:id", studentController.getStudentById);
router.put("/updateStudent/:id", studentController.updateStudent);
router.delete("/studentDelete/:id", studentController.deleteStudent);
module.exports = router;
