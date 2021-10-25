const updatePassedSubjects = (ongoingCases, payload) => {
  let newOngoingCases = [...ongoingCases].map((student) => {
    let { code, subject, status } = payload;

    if (student.code === code) {
      let newStudent = { ...student },
        passed = newStudent.passed;
      if (status === "ap") {
        if (!passed) {
          passed = [subject];
        } else if (!passed.includes(subject)) {
          passed.push(subject);
        }
        return {
          ...newStudent,
          passed,
        };
      } else if (status === "rep") {
        if (!passed) {
          return student;
        } else {
          let index = passed.findIndex((el) => el === subject);
          passed.splice(index, 1);
        }

        return {
          ...newStudent,
          passed,
        };
      }
    }

    return student;
  });

  return newOngoingCases;
};

export default updatePassedSubjects;
