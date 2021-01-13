const getBimester = (group) => {
  const firstStudentGrades = group[0].grades;

  const annuals = ["edf", "lp", "mat"];
  const bimesters = annuals.map(
    (subject) => firstStudentGrades[subject].length
  );

  return Math.max(...bimesters) / 2;
};

export default getBimester;
