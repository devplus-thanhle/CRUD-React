const Students = require("../models/studentModel");

function validPhone(phone) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return phoneRegExp.test(phone);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const studentCtrl = {
  createStudent: async (req, res) => {
    try {
      const { fullname, email, mobile, address, hobby } = req.body;

      if (!fullname || !email || !mobile || !address || !hobby) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Email is not valid" });
      }

      if (!validPhone(mobile)) {
        return res.status(400).json({ msg: "Mobile is not valid" });
      }

      const student_email = await Students.findOne({ email });
      if (student_email)
        return res.status(400).json({ msg: "Email is already exist" });

      const newStudent = new Students({
        fullname,
        email,
        mobile,
        address,
        hobby,
      });

      await newStudent.save();
      res.json({
        msg: "Student created successfully",
        student: newStudent,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllStudent: async (req, res) => {
    try {
      const students = await Students.find({});
      res.json({
        msg: "Successfully",
        students,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getStudentById: async (req, res) => {
    try {
      const student = await Students.findById(req.params.id);
      res.json({
        msg: "Successfully",
        student,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateStudent: async (req, res) => {
    try {
      const { fullname, email, mobile, address, hobby } = req.body;

      if (!fullname || !email || !mobile || !address || !hobby) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Email is not valid" });
      }

      if (!validPhone(mobile)) {
        return res.status(400).json({ msg: "Mobile is not valid" });
      }
      const student = await Students.findOneAndUpdate(
        { _id: req.params.id },
        {
          fullname,
          email,
          mobile,
          address,
          hobby,
        }
      );
      res.json({
        msg: "Successfully",
        newStudent: {
          ...student._doc,
          fullname,
          email,
          mobile,
          address,
          hobby,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  searchStudent: async (req, res) => {
    try {
      const students = await Students.find({
        fullname: { $regex: new RegExp(req.query.fullname.toLowerCase(), "i") },
      })
        .limit(10)
        .select("fullname email mobile address hobby");

      res.json({ students });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const student = await Students.findOneAndDelete({ _id: req.params.id });
      res.json({
        msg: "Delete Successfully",
        newStudent: {
          ...student,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = studentCtrl;
