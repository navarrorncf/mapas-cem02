import actionTypes from "./optionActionTypes";

export const setGroup = (group) => ({
  type: actionTypes.SET_GROUP,
  payload: group,
});

export const setGrade = (grade) => ({
  type: actionTypes.SET_GRADE,
  payload: grade,
});
