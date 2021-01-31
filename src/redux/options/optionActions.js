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

export const setFilterMode = (mode) => ({
  type: actionTypes.SET_FILTER_MODE,
  payload: mode,
});

export const setOngoingCases = (cases) => ({
  type: actionTypes.SET_ONGOING_CASES,
  payload: cases,
});

export const updateVeredict = (veredict) => ({
  type: actionTypes.UPDATE_VEREDICT,
  payload: veredict,
});

export const updatePassedSubjects = (subject) => ({
  type: actionTypes.UPDATE_PASSED_SUBJECT,
  payload: subject,
});
