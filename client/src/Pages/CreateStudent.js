import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StudentForm from "../components/StudentForm/index";
import { createStudent } from "../redux/Action/studentAction";

const CreateStudent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    hobby: "",
  });
  const onSubmit = async (studentObject) => {
    setLoading(true);
    await dispatch(createStudent(studentObject));
    setLoading(false);
  };

  return (
    <>
      <StudentForm
        initialValues={formValues}
        onSubmit={onSubmit}
        loading={loading}
        enableReinitialize
      >
        Create Student
      </StudentForm>
    </>
  );
};

export default CreateStudent;
