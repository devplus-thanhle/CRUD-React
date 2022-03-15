import React, { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm/index";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateStudent } from "../redux/Action/studentAction";
import { useParams } from "react-router-dom";

const EditStudent = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(null);
  const { id } = useParams();
  const onSubmit = (studentObject) => {
    dispatch(updateStudent(studentObject, id));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/student/" + id)
      .then((res) => {
        setFormValues(res.data.student);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {formValues && (
        <StudentForm
          initialValues={formValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          Edit Student
        </StudentForm>
      )}
    </>
  );
};

export default EditStudent;
