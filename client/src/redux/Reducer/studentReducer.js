import { DeleteData, EditData } from "../Action/globalTypes";
import { STUDENTS_TYPES } from "../Action/studentAction";

const initialState = {
  loading: false,
  students: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_TYPES.GET_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
      };
    case STUDENTS_TYPES.CREATE_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
      };
    case STUDENTS_TYPES.UPDATE_STUDENT:
      return {
        ...state,
        students: EditData(state.students, action.payload._id, action.payload),
      };
    case STUDENTS_TYPES.DELETE_STUDENT:
      return {
        ...state,
        students: DeleteData(state.students, action.payload._id),
      };
    case STUDENTS_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
