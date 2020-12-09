import reportCards from "../../dev-data/reportCards.json";
import studentSets from "../../dev-data/studentSets.json";

const allGrades = Object.keys(studentSets);
allGrades.sort();

const groupsByGrade = studentSets;

const firstGroup = groupsByGrade["1"][0];

const currentStudentName = "";

const reportCardOpen = false;

export {
  allGrades,
  groupsByGrade,
  firstGroup,
  reportCards,
  currentStudentName,
  reportCardOpen,
};
