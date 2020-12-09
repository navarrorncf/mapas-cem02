const simpleCssClass = (num) => {
  if (num < 3) {
    return "ss";
  } else if (num < 4) {
    return "ms";
  } else if (num < 6) {
    return "mm";
  } else if (num < 9) {
    return "mi";
  } else if (num >= 9) {
    return "ii";
  } else {
    return "";
  }
};

module.exports = simpleCssClass;
