import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../api/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const STUDENTS_TYPES = {
  GET_STUDENTS: "GET_STUDENTS",
  CREATE_STUDENT: "CREATE_STUDENT",
  UPDATE_STUDENT: "UPDATE_STUDENT",
  DELETE_STUDENT: "DELETE_STUDENT",
  LOADING: "LOADING",
};

export const getNotes = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENTS_TYPES.LOADING, payload: true });
    const res = await getDataAPI("students");
    dispatch({
      type: STUDENTS_TYPES.GET_STUDENTS,
      payload: { ...res.data },
    });
    dispatch({ type: STUDENTS_TYPES.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const createStudent = (studentData) => async (dispatch) => {
  try {
    const res = await postDataAPI("students", studentData);
    dispatch({
      type: STUDENTS_TYPES.CREATE_STUDENT,
      payload: { ...res.data.student },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updateStudent = (studentData, id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENTS_TYPES.LOADING,
      payload: true,
    });
    const res = await patchDataAPI(`student/${id}`, studentData);
    dispatch({
      type: STUDENTS_TYPES.UPDATE_STUDENT,
      payload: { ...res.data.newStudent },
    });
    dispatch({
      type: STUDENTS_TYPES.LOADING,
      payload: false,
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    const res = await deleteDataAPI(`student/${id}`);
    console.log(res);
    dispatch({
      type: STUDENTS_TYPES.DELETE_STUDENT,
      payload: res.data.newStudent._doc,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
