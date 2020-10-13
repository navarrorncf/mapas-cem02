import actionTypes from "./optionActionTypes";
import { allBimesters, firstGroup } from "./initialState";

const initialState = {
  grade: firstGroup[allBimesters[0]].metadata.grade,
  group: firstGroup[allBimesters[0]].metadata.group,
  bimester: Object.keys(firstGroup)[0],
  currentMap: Object.values(firstGroup)[0],
};

const optionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_BIMESTER:
      return {
        ...state,
        bimester: payload,
      };
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
