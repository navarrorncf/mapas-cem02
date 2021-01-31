const getFailedSubjectNames = require("./getFailedSubjectNames");
const date = new Date();
const year = date.getFullYear();
const day = date.getDate();
const month = date.getMonth();
const allMonths = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const abbrev = {
  art: "arte",
  bio: "biologia",
  edf: "educação física",
  esp: "espanhol",
  fil: "filosofia",
  fis: "física",
  geo: "geografia",
  his: "história",
  ing: "inglês",
  por: "português",
  lp: "português",
  mat: "matemática",
  qui: "química",
  soc: "sociologia",
};

let baseText =
  "%%DIA%% do mês de %%MES%% de %%ANO%%, às %%HORA%%, os professores do Centro de Ensino Médio 02 de Brazlândia do turno %%TURNO%% reuniram-se virtualmente com os coordenadores, a supervisão, a professora responsável pela sala de recursos generalista (SRG), o serviço de orientação educational (SOE) e a direção da instituição para a realização do conselho final de classe referente ao ano letivo de 2020. O resultado individuais dos estudantes da turma foram definidos conforme relacionado a seguir, sendo cada estudante designado por nome completo e código no sistema ieducar. ";

baseText = baseText
  .replace("%%DIA%%", day === 1 ? "Ao primeiro dia" : `Aos ${day} dias`)
  .replace("%%MES%%", allMonths[month])
  .replace("%%ANO%%", year);

const closingText =
  "Nada mais tendo a tratar, o conselho de classe final da presente turma foi encerrado e esta ata foi gerada para posterior assinatura dos participantes. Esta reunião foi gravada e a gravação estará disponível para sanar quaisquer dúvidas referentes aos resultados aqui definidos.";

const generateMeetingMinutes = (hora, allStudentsArray, studentsToFix) => {
  let bodyText = "";
  let turno = allStudentsArray[0].shift.toLowerCase();

  allStudentsArray.forEach((student) => {
    let { name, code } = student;
    let suffix = student.sex === "F" ? "a" : "o";
    let toFix = studentsToFix.find((student) => student.code === code);

    if (!toFix || toFix.veredict === "ap") {
      bodyText += `${code} - ${name}: aprovad${suffix} (AP). `;
    } else if (toFix.veredict === "apc") {
      let passed = toFix.passed;
      let failedSubjectNames = getFailedSubjectNames(student);
      let passedSubjects = failedSubjectNames
        .filter((el) => (passed && !passed.includes(el)) || !passed)
        .join(", ")
        .replace(/, ([a-z]{3})$/, " e $1");

      failedSubjectNames.forEach((sub) => {
        passedSubjects = passedSubjects.replace(sub, abbrev[sub]);
      });

      bodyText += `${code} - ${name}: aprovad${suffix} via conselho em ${passedSubjects} (AP**). `;
    } else if (toFix.veredict === "rep") {
      let passed = toFix.passed;
      let failedSubjectNames = getFailedSubjectNames(student);
      let passedSubjects = failedSubjectNames
        .filter((el) => (passed && !passed.includes(el)) || !passed)
        .join(", ")
        .replace(/, ([a-z]{3})$/, " e $1");

      failedSubjectNames.forEach((sub) => {
        passedSubjects = passedSubjects.replace(sub, abbrev[sub]);
      });

      bodyText += `${code} - ${name}: reprovad${suffix} em ${passedSubjects} (REP). `;
    } else {
      console.log("Caso não tratado!", code);
    }
  });

  return (
    baseText.replace("%%HORA%%", hora).replace("%%TURNO%%", turno) +
    bodyText +
    closingText
  );
};

module.exports = generateMeetingMinutes;
