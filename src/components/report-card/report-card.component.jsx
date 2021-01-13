import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setReportCardOpen,
  setCurrentStudentIndex,
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
    1: ["bio", "fil", "his", "ing", "qui"],
    2: ["art", "esp", "fis", "geo", "soc", "pd2"],
  };

  let student = currentMap[index];
  let failedSubjects = getFailedSubjects(student);

  const handleClose = (e) => {
    const targetID = e.target.id;
    if (targetID !== "report-card-container" && targetID !== "close-button") {
      return;
    }
    dispatch(setCurrentStudentIndex(0));
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

  useEffect(() => {
    setIndex(currentStudentIndex);
  }, [currentStudentIndex]);

  return (
    <div
      className={`report-card-container ${reportCardOpen ? "" : "closed"}`}
      id="report-card-container"
      onKeyUp={handleKeyUp}
      onClick={handleClose}
    >
      <div className="report-card">
        <div className="close-button" id="close-button" onClick={handleClose}>
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
                  <td className="disciplinas"> {lengthen["edf"]} </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["edf"][0] || "-"
                    )}`}
                  >
                    {student.grades["edf"][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["edf"][1] || "-"
                    )}`}
                  >
                    {student.grades["edf"][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["edf"][2] || "-"
                    )}`}
                  >
                    {student.grades["edf"][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["edf"][3] || "-"
                    )}`}
                  >
                    {student.grades["edf"][3] || "-"}
                  </td>
                  <td className="disciplinas">{lengthen["edf"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["edf"][4] || "-"
                    )}`}
                  >
                    {student.grades["edf"][4] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["edf"][5] || "-"
                    )}`}
                  >
                    {student.grades["edf"][5] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["edf"][6] || "-"
                    )}`}
                  >
                    {student.grades["edf"][6] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["edf"][7] || "-"
                    )}`}
                  >
                    {student.grades["edf"][7] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">{lengthen["lp"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["lp"][0] || "-"
                    )}`}
                  >
                    {student.grades["lp"][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["lp"][1] || "-"
                    )}`}
                  >
                    {student.grades["lp"][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["lp"][2] || "-"
                    )}`}
                  >
                    {student.grades["lp"][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["lp"][3] || "-"
                    )}`}
                  >
                    {student.grades["lp"][3] || "-"}
                  </td>
                  <td className="disciplinas">{lengthen["lp"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["lp"][4] || "-"
                    )}`}
                  >
                    {student.grades["lp"][4] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["lp"][5] || "-"
                    )}`}
                  >
                    {student.grades["lp"][5] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["lp"][6] || "-"
                    )}`}
                  >
                    {student.grades["lp"][6] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["lp"][7] || "-"
                    )}`}
                  >
                    {student.grades["lp"][7] || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="disciplinas">{lengthen["mat"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["mat"][0] || "-"
                    )}`}
                  >
                    {student.grades["mat"][0] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["mat"][1] || "-"
                    )}`}
                  >
                    {student.grades["mat"][1] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["mat"][2] || "-"
                    )}`}
                  >
                    {student.grades["mat"][2] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["mat"][3] || "-"
                    )}`}
                  >
                    {student.grades["mat"][3] || "-"}
                  </td>
                  <td className="disciplinas">{lengthen["mat"]}</td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["mat"][4] || "-"
                    )}`}
                  >
                    {student.grades["mat"][4] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["mat"][5] || "-"
                    )}`}
                  >
                    {student.grades["mat"][5] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleCssClass(
                      student.grades["mat"][6] || "-"
                    )}`}
                  >
                    {student.grades["mat"][6] || "-"}
                  </td>
                  <td
                    className={`coluna ${simpleAttendanceClass(
                      student.grades["mat"][7] || "-"
                    )}`}
                  >
                    {student.grades["mat"][7] || "-"}
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
