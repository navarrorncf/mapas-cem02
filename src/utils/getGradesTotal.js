const getNumber = require("./getNumber");

const getGradesTotal = (student) => {
  const grades = student.grades;

  const gradeTotals = {};

  Object.keys(grades).forEach((grade) => {
    gradeTotals[grade] =
      getNumber(grades[grade][0]) +
      getNumber(grades[grade][2]) +
      getNumber(grades[grade][4]) +
      getNumber(grades[grade][6]);
  });

  return gradeTotals;
};

module.exports = getGradesTotal;
