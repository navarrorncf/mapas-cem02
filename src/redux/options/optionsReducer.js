import actionTypes from "./optionActionTypes";
import {
  allGrades,
  firstGroup,
  currentStudentIndex,
  reportCardOpen,
} from "./initialState";

const initialState = {
  grade: allGrades[0],
  group: firstGroup,
  currentStudentIndex,
  reportCardOpen,
};

const optionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_GRADE:
      return {
        ...state,
        grade: payload,
      };
    case actionTypes.SET_GROUP:
      return {
        ...state,
        group: payload,
      };
    case actionTypes.SET_CURRENT_STUDENT_INDEX:
      return {
        ...state,
        currentStudentIndex: payload,
      };
    case actionTypes.SET_REPORT_CARD_OPEN:
      return {
        ...state,
        reportCardOpen: payload,
      };
    default:
      return state;
  }
};

export default optionsReducer;
