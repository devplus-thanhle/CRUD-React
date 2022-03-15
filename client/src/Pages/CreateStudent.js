import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StudentForm from "../components/StudentForm/index";
import { createStudent } from "../redux/Action/studentAction";

const CreateStudent = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    hobby: "",
  });
  const onSubmit = (studentObject) => {
    dispatch(createStudent(studentObject));
  };

  return (
    <>
      <StudentForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Create Student
      </StudentForm>
    </>
  );
};

export default CreateStudent;
