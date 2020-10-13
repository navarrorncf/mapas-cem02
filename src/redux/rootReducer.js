import { combineReducers } from "redux";
import optionsReducer from "./options/optionsReducer";

export default combineReducers({
  options: optionsReducer,
});
