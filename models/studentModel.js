const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    hobby: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);
