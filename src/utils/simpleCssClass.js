const simpleCssClass = (num) => {
  if (num < 3) {
    return "ii";
  } else if (num < 4.75) {
    return "mi";
  } else if (num < 5) {
    return "mm";
  } else if (num < 7) {
    return "ms";
  } else if (num <= 10) {
    return "ss";
  } else {
    return "";
  }
};

module.exports = simpleCssClass;
