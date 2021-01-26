const getFailedSubjects = require("./getFailedSubjects");

const filterMap = (map, mode) => {
  switch (mode) {
    case "none":
      return map;
    case "passed":
      return map.filter((el) => getFailedSubjects(el) === 0);
    case "ongoing":
      return map.filter((el) => getFailedSubjects(el) > 0);
    case "rec":
      return map.filter((el) => {
        const failedSubjects = getFailedSubjects(el);
        return failedSubjects > 0 && failedSubjects < 4;
      });
    case "failed":
      return map.filter((el) => getFailedSubjects(el) > 4);
    default:
      return map;
  }
};

module.exports = filterMap;
