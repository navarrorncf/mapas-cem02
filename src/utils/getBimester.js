const getBimester = (group) => {
  const firstStudentGrades = group[0].grades;

  const annuals = ["EDF", "LP", "MAT"];
  const bimesters = annuals.map(
    (subject) => firstStudentGrades[subject].length
  );

  return Math.max(...bimesters) / 2;
};

module.exports = getBimester;
