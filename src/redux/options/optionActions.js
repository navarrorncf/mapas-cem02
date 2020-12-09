import actionTypes from "./optionActionTypes";

export const setGroup = (group) => ({
  type: actionTypes.SET_GROUP,
  payload: group,
});

export const setGrade = (grade) => ({
  type: actionTypes.SET_GRADE,
  payload: grade,
});

export const setCurrentStudentIndex = (index) => ({
  type: actionTypes.SET_CURRENT_STUDENT_INDEX,
  payload: index,
});

export const setReportCardOpen = (open) => ({
  type: actionTypes.SET_REPORT_CARD_OPEN,
  payload: open,
});
