const parseData = (data) => {
  const allGrades = new Set();
  const allGroups = Object.keys(data).sort();
  const allBimesters = new Set();

  for (let group of Object.values(data)) {
    let grade = Object.values(group)[0].metadata.grade;
    allGrades.add(grade);

    let bimesters = Object.keys(group);
    bimesters.forEach((bim) => allBimesters.add(bim));
  }

  const groupsByGrade = {};

  Object.values(data).forEach((group) => {
    const bim = Object.keys(group)[0];
    const grade = group[bim].metadata.grade;
    if (!groupsByGrade[grade]) {
      groupsByGrade[grade] = [];
    }

    groupsByGrade[grade].push(group[bim].metadata.group);
  });

  const toArray = (set) => Array.from(set).sort();

  return {
    allGrades: toArray(allGrades),
    allGroups,
    allBimesters: toArray(allBimesters),
    firstGroup: Object.values(data)[0],
    groupsByGrade,
  };
};

module.exports = parseData;
