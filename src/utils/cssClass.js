const cssClass = (key, value, student) => {
  if (key === "NOME") {
    return "text";
  }

  const bim = student.grades[key].filter((el) => el !== "-").length / 2;

  let avg = (value * 1 || 0) / bim;

  if (avg < 3) {
    return "ii";
  } else if (avg < 4.75) {
    return "mi";
  } else if (avg < 5) {
    return "mm";
  } else if (avg < 7) {
    return "ms";
  } else {
    return "ss";
  }
};

module.exports = cssClass;
