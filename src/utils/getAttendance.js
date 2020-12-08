const getNumber = require("./getNumber");

const getAttendance = (studentObject) => {
  const grades = Object.values(studentObject.grades);

  const attendanceArray = grades.map(
    (subject) =>
      getNumber(subject[1]) +
      getNumber(subject[3]) +
      getNumber(subject[5]) +
      getNumber(subject[7])
  );

  const attendanceCount = attendanceArray.reduce((acc, cur) => acc + cur, 0);

  return attendanceCount;
};

module.exports = getAttendance;
