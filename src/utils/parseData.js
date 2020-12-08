const parseData = (reportCards, studentSets) => {
  const allGrades = Object.keys(studentSets);
  allGrades.sort();

  return {
    allGrades,
    groupsByGrade: studentSets,
  };
};

module.exports = parseData;
