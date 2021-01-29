const checkSubjectPassed = (student, subject) => {
  const grades = student.grades;

  let bim = grades[subject].filter((el) => el !== "-").length / 2;
  let values = grades[subject].filter(
    (el, index) => el !== "-" && index % 2 === 0
  );
  let average = values.reduce((acc, cur) => acc + cur * 1, 0);
  average /= bim;

  if (average < 4.75) {
    return false;
  }

  return true;
};

module.exports = checkSubjectPassed;
