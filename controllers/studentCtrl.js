const Students = require("../models/studentModel");

function isValidEmail(str) {
  if (str === "" || !str.includes("@")) return false;
  const firstAs = str.indexOf("@");
  const firstDot = str.indexOf(".");

  const firstWord = str.slice(0, firstAs);
  const secondWord = str.slice(firstAs + 1, firstDot);

  const domain = str.slice(firstDot);
  const isDomain = [".com.vn", ".com", ".vn"].some((x) => x === domain);

  if (firstWord.length < 3 || secondWord.length < 3 || !isDomain) return false;

  return true;
}

const studentCtrl = {
  createStudent: async (req, res) => {
    try {
      const { fullname, email, mobile, address, hobby } = req.body;

      if (!fullname || !email || !mobile || !address || !hobby) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Email is not valid" });
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
  updateStudent: async (req, res) => {
    try {
      const { fullname, email, mobile, address, hobby } = req.body;
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
