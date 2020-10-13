const calcCssClass = (key, value, bimester, block = "1") => {
  const bim = bimester[0] * 1;

  if (key === "NUM") {
    return "text num";
  } else if (key === "NOME") {
    return "text";
  } else if (key === "FALTAS") {
    const val = value * 1;
    if (val < bim * 15) {
      return "ss";
    } else if (val < bim * 30) {
      return "ms";
    } else if (val < bim * 50) {
      return "mi";
    }
    return "ii";
  }

  const anualsubjects = ["EDF", "LP", "MAT"];
  const subjectBlocks = {
    1: ["BIO", "FIL", "HIS", "ING", "QUI", "PD1"],
    2: ["ART", "ESP", "FIS", "GEO", "SOC", "PD2", "PD3"],
  };

  let avg = value * 1;

  if (bim <= 2 || anualsubjects.includes(key)) {
    avg /= bim;
  } else if (bim === 4 || !subjectBlocks[block].includes(key)) {
    avg /= 2;
  }

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

module.exports = calcCssClass;
