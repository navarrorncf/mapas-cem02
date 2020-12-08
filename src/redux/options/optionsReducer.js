import actionTypes from "./optionActionTypes";
import { allGrades, firstGroup /* reportCards */ } from "./initialState";

const initialState = {
  grade: allGrades[0],
  group: firstGroup,
  // currentMap: reportCards.filter((student) => student.group === firstGroup),
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
    default:
      return state;
  }
};

export default optionsReducer;
