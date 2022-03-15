const router = require("express").Router();
const studentCtrl = require("../controllers/studentCtrl");

router
  .route("/students")
  .post(studentCtrl.createStudent)
  .get(studentCtrl.getAllStudent);

router
  .route("/student/:id")
  .get(studentCtrl.getStudentById)
  .patch(studentCtrl.updateStudent)
  .delete(studentCtrl.deleteStudent);

router.get("/search", studentCtrl.searchStudent);

module.exports = router;
