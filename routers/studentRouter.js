const router = require("express").Router();
const studentCtrl = require("../controllers/studentCtrl");

router
  .route("/students")
  .post(studentCtrl.createStudent)
  .get(studentCtrl.getAllStudent);

router
  .route("/student/:id")
  .patch(studentCtrl.updateStudent)
  .delete(studentCtrl.deleteStudent);

module.exports = router;
