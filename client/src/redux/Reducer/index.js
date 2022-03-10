import { combineReducers } from "redux";
import student from "./studentReducer";
import alert from "./alertReducer";

export default combineReducers({
  alert,
  student,
});
