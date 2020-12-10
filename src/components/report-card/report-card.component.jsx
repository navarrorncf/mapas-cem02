import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setReportCardOpen,
  // setCurrentStudentIndex,
} from "../../redux/options/optionActions";

import reportCards from "../../dev-data/reportCards.json";
import { lengthen } from "../../utils/abbreviations";
import simpleCssClass from "../../utils/simpleCssClass";
import simpleAttendanceClass from "../../utils/simpleAttendanceClass";
import getAttendance from "../../utils/getAttendance";
import getFailedSubjects from "../../utils/getFailedSubjects";

import brasao from "../../assets/images/brasao-df.png";
import logo from "../../assets/images/logo128.png";

import "./report-card.styles.scss";

const ReportCard = () => {
  const dispatch = useDispatch();

  const { group, reportCardOpen, currentStudentIndex } = useSelector(
    (state) => state.options
  );

  const [index, setIndex] = useState(0);

  const [open, setOpen] = useState(
    useSelector((state) => state.options.reportCardOpen)
  );

  const currentMap = reportCards.filter(
    (reportCard) => reportCard.group === group
  );

  const blocks = currentMap[0].block;
  const maxIndex = currentMap.length - 1;

  const subByBlock = {
    1: ["BIO", "FIL", "HIS", "ING", "QUI"],
    2: ["ART", "ESP", "FIS", "GEO", "SOC", "PD2"],
  };

  let student = currentMap[index];
  let failedSubjects = getFailedSubjects(student);

  const handleClose = (e) => {
    dispatch(setReportCardOpen(false));
  };

  const handleChevron = (operation) => {
    const i = index;
    if (operation === "+" && index < maxIndex) {
      setIndex(i + 1);
      // dispatch(setCurrentStudentIndex(index));
    } else if (operation === "-" && index > 0) {
      setIndex(i - 1);
      // dispatch(setCurrentStudentIndex(index));
    }

    failedSubjects = getFailedSubjects(student);
  };

  const handleKeyUp = (e) => {
    console.log(e.key, index, maxIndex, open);

    if (e.key === "ArrowRight") {
      handleChevron("+");
    } else if (e.key === "ArrowLeft") {
      handleChevron("-");
    } else if (e.key === "Escape") {
      setOpen(false);
      dispatch(setReportCardOpen(open));
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp, false);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  /*   useEffect(() => {
    setIndex(0);
  }, [currentMap]); */

  return (
    <div
      className={`report-card-container ${reportCardOpen ? "" : "closed"}`}
      id="report-card-container"
      onKeyUp={handleKeyUp}
    >
      <div className="report-card">
        <div className="close-button" onClick={handleClose}>
          ✕
        </div>
        <div className="chevron-right" onClick={() => handleChevron("+")}>
          ❱
        </div>
        <div className="chevron-left" onClick={() => handleChevron("-")}>
          ❰
        </div>
        <div className="report-card--data">
          <div className="heading">
            <div className="image-container">
              <img src={logo} alt="Brsão do " />
            </div>
            <h3>
              Governo do Distrito Federal
              <br />
              Secretaria de Estado de Educação
              <br />
              Coordenação Regional de ensino de Brazlândia
              <br />
              Centro de Ensino Médio 02
            </h3>
            <div className="image-container">
              <img src={brasao} alt="Brsão do " />
            </div>
          </div>
          <div className="student-data">
            <p>Nome: {student.name} </p>
            <p>Nascimento: {student.birthdate} </p>
            <p>Série: {student.schoolYear}ª série</p>
            <p>Turma: {student.group} </p>
          </div>
          <div className="grades-data">
            <table>
              <thead>
                <tr>
                  <th rowSpan="2" className="disciplinas">
                    BLOCO {blocks[0]}
                  </th>
                  <th colSpan="2">1º Bimestre</th>
                  <th colSpan="2">2º Bimestre</th>
                  <th rowSpan="2" className="disciplinas">
                    BLOCO {blocks[1]}
                  </th>
                  <th colSpan="2">3º Bimestre</th>
                  <th colSpan="2">4º Bimestre</th>
                </tr>
                <tr>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                </tr>
              </thead>
              <tbody>
                {/* {[0, 1, 2, 3, 4, 5].map((i) => (
                  <tr>
                    {blocks.map((block) => {
                      return (
                        <React.Fragment>
                          <td className="disciplinas">
                            {lengthen[subByBlock[block][i]]}
                          </td>
                          {student.grades[subByBlock[block][i]].map((data) => (
                            <td className={`coluna ${simpleCssClass(data)}`}>
                              {data}
                            </td>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))} */}
                <tr>
                  <td className="disciplinas"> {lengthen["EDF"]} </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["EDF"][0] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["EDF"][1] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["EDF"][2] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["EDF"][3] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][3] || "-"}
                  </td>
                  <td className="disciplinas">{lengthen["EDF"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["EDF"][4] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][4] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["EDF"][5] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][5] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["EDF"][6] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][6] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["EDF"][7] || "-"
                    )}`}
                  >
                    {student.grades["EDF"][7] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">{lengthen["LP"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["LP"][0] || "-"
                    )}`}
                  >
                    {student.grades["LP"][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["LP"][1] || "-"
                    )}`}
                  >
                    {student.grades["LP"][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["LP"][2] || "-"
                    )}`}
                  >
                    {student.grades["LP"][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["LP"][3] || "-"
                    )}`}
                  >
                    {student.grades["LP"][3] || "-"}
                  </td>
                  <td className="disciplinas">{lengthen["LP"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["LP"][4] || "-"
                    )}`}
                  >
                    {student.grades["LP"][4] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["LP"][5] || "-"
                    )}`}
                  >
                    {student.grades["LP"][5] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["LP"][6] || "-"
                    )}`}
                  >
                    {student.grades["LP"][6] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["LP"][7] || "-"
                    )}`}
                  >
                    {student.grades["LP"][7] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">{lengthen["MAT"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["MAT"][0] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["MAT"][1] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["MAT"][2] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["MAT"][3] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][3] || "-"}
                  </td>
                  <td className="disciplinas">{lengthen["MAT"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["MAT"][4] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][4] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["MAT"][5] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][5] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["MAT"][6] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][6] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["MAT"][7] || "-"
                    )}`}
                  >
                    {student.grades["MAT"][7] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[0]][0]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][0]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][0]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][0]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][0]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][0]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][0]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][0]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][0]][3] || "-"}
                  </td>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[1]][0]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][0]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][0]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][0]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][0]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][0]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][0]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][0]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][0]][3] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[0]][1]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][1]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][1]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][1]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][1]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][1]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][1]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][1]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][1]][3] || "-"}
                  </td>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[1]][1]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][1]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][1]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][1]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][1]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][1]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][1]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][1]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][1]][3] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[0]][2]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][2]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][2]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][2]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][2]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][2]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][2]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][2]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][2]][3] || "-"}
                  </td>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[1]][2]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][2]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][2]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][2]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][2]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][2]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][2]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][2]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][2]][3] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[0]][3]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][3]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][3]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][3]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][3]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][3]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][3]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][3]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][3]][3] || "-"}
                  </td>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[1]][3]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][3]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][3]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][3]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][3]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][3]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][3]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][3]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][3]][3] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[0]][4]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][4]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][4]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][4]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][4]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[0]][4]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][4]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[0]][4]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[0]][4]][3] || "-"}
                  </td>
                  <td className="disciplinas">
                    {lengthen[subByBlock[blocks[1]][4]]}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][4]][0] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][4]][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][4]][1] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][4]][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades[subByBlock[blocks[1]][4]][2] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][4]][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades[subByBlock[blocks[1]][4]][3] || "-"
                    )}`}
                  >
                    {student.grades[subByBlock[blocks[1]][4]][3] || "-"}
                  </td>
                </tr>
                <tr>
                  {!subByBlock[blocks[0]][5] ? (
                    <React.Fragment>
                      <td className="disciplinas"></td>
                      <td className="coluna">-</td>
                      <td className="coluna">-</td>
                      <td className="coluna">-</td>
                      <td className="coluna">-</td>
                      <td className="disciplinas">
                        {lengthen[subByBlock[blocks[1]][5]] || ""}
                      </td>
                      <td
                        className={`coluna ${simpleCssClass(
                          student.grades[subByBlock[blocks[1]][5]][0] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[1]][5]][0] || "-"}
                      </td>
                      <td
                        className={`coluna ${simpleAttendanceClass(
                          student.grades[subByBlock[blocks[1]][5]][1] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[1]][5]][1] || "-"}
                      </td>
                      <td
                        className={`coluna ${simpleCssClass(
                          student.grades[subByBlock[blocks[1]][5]][2] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[1]][5]][2] || "-"}
                      </td>
                      <td
                        className={`coluna ${simpleAttendanceClass(
                          student.grades[subByBlock[blocks[1]][5]][3] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[1]][5]][3] || "-"}
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td className="disciplinas">
                        {lengthen[subByBlock[blocks[0]][5]] || ""}
                      </td>
                      <td
                        className={`coluna ${simpleCssClass(
                          student.grades[subByBlock[blocks[0]][5]][0] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[0]][5]][0] || "-"}
                      </td>
                      <td
                        className={`coluna ${simpleAttendanceClass(
                          student.grades[subByBlock[blocks[0]][5]][1] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[0]][5]][1] || "-"}
                      </td>
                      <td
                        className={`coluna ${simpleCssClass(
                          student.grades[subByBlock[blocks[0]][5]][2] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[0]][5]][2] || "-"}
                      </td>
                      <td
                        className={`coluna ${simpleAttendanceClass(
                          student.grades[subByBlock[blocks[0]][5]][3] || "-"
                        )}`}
                      >
                        {student.grades[subByBlock[blocks[0]][5]][3] || "-"}
                      </td>
                      <td className="disciplinas"></td>
                      <td className="coluna">-</td>
                      <td className="coluna">-</td>
                      <td className="coluna">-</td>
                      <td className="coluna">-</td>
                    </React.Fragment>
                  )}
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total de Faltas: {getAttendance(student)}</th>
                </tr>
                <tr>
                  <th>
                    {failedSubjects === 0
                      ? "Aprovado"
                      : failedSubjects === 1
                      ? "Recuperação em 1 disciplina"
                      : `Recuperação em ${failedSubjects} disciplinas`}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
