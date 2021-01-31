import actionTypes from "./optionActionTypes";
import {
  allGrades,
  firstGroup,
  currentStudentIndex,
  reportCardOpen,
  filterMode,
  ongoingCases,
} from "./initialState";

import updatePassedSubjects from "./updatePassedSubjects";

const initialState = {
  grade: allGrades[0],
  group: firstGroup,
  currentStudentIndex,
  reportCardOpen,
  filterMode,
  ongoingCases,
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
    case actionTypes.SET_FILTER_MODE:
      return {
        ...state,
        filterMode: payload,
      };
    case actionTypes.SET_ONGOING_CASES:
      return {
        ...state,
        ongoingCases: payload,
      };
    case actionTypes.UPDATE_VEREDICT:
      let newVeredicts = [...state.ongoingCases].map((student) => {
        let { code, veredict } = payload;
        if (student.code === code) {
          let newStudent = { ...student };

          return {
            ...newStudent,
            veredict,
          };
        }
        return student;
      });

      return {
        ...state,
        ongoingCases: newVeredicts,
      };
    case actionTypes.UPDATE_PASSED_SUBJECT:
      let newOngoingCases = updatePassedSubjects(state.ongoingCases, payload);

      return {
        ...state,
        ongoingCases: newOngoingCases,
      };
    default:
      return state;
  }
};

export default optionsReducer;
