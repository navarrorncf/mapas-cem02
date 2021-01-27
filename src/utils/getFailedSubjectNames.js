const getFailedSubjects = (student) => {
  const grades = student.grades;
  let res = [];

  Object.keys(grades).forEach((subject) => {
    if (!/pd/.test(subject)) {
      let bim = grades[subject].filter((el) => el !== "-").length / 2;
      let values = grades[subject].filter(
        (el, index) => el !== "-" && index % 2 === 0
      );
      let average = values.reduce((acc, cur) => acc + cur * 1, 0);
      average /= bim;

      if (average < 4.75) {
        res.push(subject);
      }
    }
  });

  return res;
};

module.exports = getFailedSubjects;
