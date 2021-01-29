const fs = require("fs");
const path = require("path");

const reportCards = require("../dev-data/reportCards.json");

const checkSubjectPassed = require("./checkSubjectPassed");
const getFailedSubjects = require("./getFailedSubjects");
const getAttendance = require("./getAttendance");

const subjects = {
  art: {
    tay: {
      nome: "Tayane",
      turmas: [
        "Argentina",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
        "Venezuela",
      ],
    },
    raf: {
      nome: "Rafael Gomes",
      turmas: ["Austrália", "Bolívia"],
    },
    ale: {
      nome: "Alerandra",
      turmas: [
        "Alemanha",
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
    kat: {
      nome: "Kátia",
      turmas: ["EUA", "Romênia"],
    },
  },
  bio: {
    igo: {
      nome: "Igor",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
    pat: {
      nome: "Patrícia",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    del: {
      nome: "Delminda",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
  },
  edf: {
    alm: {
      nome: "Almir",
      turmas: ["Canadá", "Romênia", "África do Sul", "Brasil"],
    },
    dar: {
      nome: "Darlyson",
      turmas: [
        "Alemanha",
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Chile",
        "EUA",
        "Japão",
        "Polônia",
        "Ucrânia",
        "China",
        "Rússia",
        "Índia",
      ],
    },
    gab: {
      nome: "Gabriel",
      turmas: ["Egito", "Palestina", "França", "Itália"],
    },
    ren: {
      nome: "Renato",
      turmas: [
        "Argentina",
        "Austrália",
        "Bolívia",
        "Espanha",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "México",
        "Portugal",
        "Venezuela",
      ],
    },
  },
  esp: {
    jul: {
      nome: "Juliana",
      turmas: [
        "Argentina",
        "Austrália",
        "Bolívia",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
        "Venezuela",
        "Alemanha",
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "EUA",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
  },
  fil: {
    bru: {
      nome: "Bruno",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
    fra: {
      nome: "Francisco",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    ric: {
      nome: "Ricardo",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
  },
  fis: {
    lar: {
      nome: "Laryssa",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    luc: {
      nome: "Lucas",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
    lui: {
      nome: "Luiz Fernando",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
  },
  geo: {
    kat: {
      nome: "Katiana",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
    ron: {
      nome: "Roniel",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    ter: {
      nome: "Teresa",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
  },
  his: {
    ale: {
      nome: "Alessandro",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
    ron: {
      nome: "Roniel",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    tal: {
      nome: "Talita",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
  },
  ing: {
    sil: {
      nome: "Silvano",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
    jes: {
      nome: "Jesiane",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    dan: {
      nome: "Danielle",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
  },
  lp: {
    gei: {
      nome: "Geise",
      turmas: [
        "Austria",
        "Bélgica",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "África do Sul",
        "China",
      ],
    },
    gus: {
      nome: "Gusman",
      turmas: [
        "Arábia Saudita",
        "Canadá",
        "Chile",
        "Japão",
        "Brasil",
        "Rússia",
        "Índia",
      ],
    },
    jes: {
      nome: "Jesiane",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    sam: {
      nome: "Samara",
      turmas: [
        "Argentina",
        "Egito",
        "Inglaterra",
        "Irã",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
    lar: {
      nome: "Larissa",
      turmas: [
        "Austrália",
        "Espanha",
        "França",
        "Grécia",
        "Iraque",
        "Israel",
        "Itália",
      ],
    },
  },
  mat: {
    kar: {
      nome: "Karine",
      turmas: [
        "Arábia Saudita",
        "Canadá",
        "Chile",
        "Japão",
        "Brasil",
        "Índia",
        "Rússia",
      ],
    },
    her: {
      nome: "Hérton",
      turmas: [
        "Austria",
        "Bélgica",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "China",
        "África do Sul",
      ],
    },
    lar: {
      nome: "Laryssa",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    mar: {
      nome: "Marcos Azambuja",
      turmas: [
        "Austrália",
        "Espanha",
        "França",
        "Grécia",
        "Iraque",
        "Israel",
        "Itália",
      ],
    },
    pla: {
      nome: "Plácido",
      turmas: [
        "Argentina",
        "Egito",
        "Inglaterra",
        "Irã",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
  },
  qui: {
    edi: {
      nome: "Edivaldo",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
    ema: {
      nome: "Emanuele",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    eve: {
      nome: "Éverton",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
  },
  soc: {
    ann: {
      nome: "Anna Carolina",
      turmas: [
        "Arábia Saudita",
        "Austria",
        "Bélgica",
        "Canadá",
        "Chile",
        "Japão",
        "Polônia",
        "Romênia",
        "Ucrânia",
        "Brasil",
        "China",
        "Rússia",
        "África do Sul",
        "Índia",
      ],
    },
    fra: {
      nome: "Francisco",
      turmas: ["Bolívia", "Venezuela", "Alemanha", "EUA"],
    },
    raf: {
      nome: "Rafael Fernandes",
      turmas: [
        "Argentina",
        "Austrália",
        "Egito",
        "Espanha",
        "França",
        "Grécia",
        "Inglaterra",
        "Iraque",
        "Irã",
        "Israel",
        "Itália",
        "México",
        "Palestina",
        "Portugal",
      ],
    },
  },
};

let separator = "\n************************************\n";
let fullReport = "";

const studentReport = (student, subject) => {
  let passed = checkSubjectPassed(student, subject);

  if (!passed) {
    let { code, name, group } = student;
    let attendance = getAttendance(student);
    let otherFailedSubjects = getFailedSubjects(student) - 1;

    let recsText =
      otherFailedSubjects > 1
        ? `Recuperação em outras ${otherFailedSubjects}`
        : otherFailedSubjects === 1
        ? `Recuperação em ${otherFailedSubjects} outra`
        : `Recuperação apenas nesta disciplina`;

    return `${group},${code},${name},${attendance},${recsText}\n`;
  }

  return "";
};

for (let i in subjects) {
  let subject = i;
  for (let k in subjects[i]) {
    let teacher = subjects[i][k].nome;
    let groups = subjects[i][k].turmas;

    fullReport += separator;
    fullReport += `${teacher} - ${subject}\n`;

    for (let groupName of groups) {
      let filteredGroup = reportCards.filter(
        (group) => groupName === group.group
      );
      for (let student of filteredGroup) {
        fullReport += studentReport(student, subject);
      }
    }
  }
}

fs.writeFileSync(path.join(__dirname, "teachersReport.txt"), fullReport, {
  encoding: "utf-8",
});
