import data from "../../dev-data/output.json";
import parseData from "../../utils/parseData";

export const {
  allBimesters,
  allGroups,
  allGrades,
  firstGroup,
  groupsByGrade,
} = parseData(data);
