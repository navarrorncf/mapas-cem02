import reportCards from "../../dev-data/reportCards.json";

const studentSets = reportCards
  .map(({ group, schoolYear }) => ({ group, schoolYear }))
  .reduce(
    (acc, cur) => {
      const currentSchoolYear = cur.schoolYear,
        currentGradeGroups = acc[currentSchoolYear],
        currentGroup = cur.group;

      return currentGradeGroups.includes(currentGroup)
        ? acc
        : {
            ...acc,
            [currentSchoolYear]: [...currentGradeGroups, currentGroup].sort(),
          };
    },
    { 1: [], 2: [], 3: [] }
  );

console.log(studentSets);

const allGrades = Object.keys(studentSets);
allGrades.sort();

const groupsByGrade = studentSets;

const firstGroup = groupsByGrade["1"][0];

const reportCardOpen = false;

const currentStudentIndex = 0;

const filterMode = "none";

const ongoingCases = [];

export {
  allGrades,
  groupsByGrade,
  firstGroup,
  reportCards,
  currentStudentIndex,
  reportCardOpen,
  filterMode,
  ongoingCases,
};
