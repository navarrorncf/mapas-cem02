import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./minutes.styles.scss";

import filterMap from "../../utils/filterMap";
import generateMeetingMinutes from "../../utils/generateMeetingMinutes";
import getFailedSubjectNames from "../../utils/getFailedSubjectNames";

import MinuteCard from "../minute-card/minute-card.component";

import reportCards from "../../dev-data/reportCards.json";

const Minutes = () => {
  const { group } = useSelector((state) => state.options);

  const currentGroupData = reportCards.filter(
    (reportCard) => reportCard.group === group
  );

  const ongoing = filterMap(currentGroupData, "ongoing");

  let students = {};
  let studentsArray = [];
  ongoing.forEach((student) => {
    let code = student.code;
    let failedSubjects = getFailedSubjectNames(student);
    let studentObject = {
      veredict: "rep",
      failedSubjects,
      ...student,
      passed: [],
    };
    students[code] = studentObject;
    studentsArray.push(studentObject);
  });

  let [groupState, setGroupState] = useState(students);

  const handleSetGroupState = (code, subject, payload) => {
    let state = { ...groupState };
    let student = state[code];
    if (!student.passed) {
      student.passed = [];
    }

    if (payload === "ap" && !student.passed.includes(subject)) {
      student.passed.push(subject);
    } else if (payload === "rep" && student.passed.includes(subject)) {
      let newArr = [...student.passed].filter((el) => el !== subject);
      console.log(student.passed, newArr);
      student.passed = newArr;
    } else {
      console.log("ué", subject, payload);
    }

    setGroupState({
      [code]: student,
      ...state,
    });
  };

  const handleVeredict = (code, payload) => {
    const state = { ...groupState };
    const update = state[code];
    update.veredict = payload;

    setGroupState({
      [code]: update,
      ...state,
    });
  };

  const [hora, setHora] = useState("");

  const handleHora = (e) => {
    setHora(e.target.value);
  };

  const save = function (filename, data) {
    var blob = new Blob([data], { type: "text/csv", oneTimeOnly: true });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      var elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  };

  return (
    <div className="minutes-container">
      <div className="minutes">
        <h2>Ata &mdash; {group}</h2>
        <div className="minutes-generator">
          <div className="hora">
            <label htmlFor="hora">Horário de início</label>
            <input
              type="text"
              name="hora"
              id="hora"
              value={hora}
              placeholder="digite o horário de início do conselho por extenso"
              onChange={handleHora}
            />
          </div>
          <button
            onClick={() => {
              for (let student of Object.values(groupState)) {
                if (
                  student.veredict === "rep" &&
                  (student.failedSubjects.length < 3 ||
                    (student.passed &&
                      student.failedSubjects.length - student.passed.length <
                        3))
                ) {
                  return alert(
                    "Erro: existe algum estudante reprovado por menos de 3 disciplinas?"
                  );
                }
              }
              return save(
                `ATA FINAL - ${group}.txt`,
                generateMeetingMinutes(
                  hora.trim().toLowerCase(),
                  currentGroupData,
                  groupState
                )
              );
            }}
          >
            Baixar Ata do Conselho
          </button>
        </div>
        {studentsArray.map((student) => {
          return (
            <MinuteCard
              student={student}
              key={`minute-${student.code}`}
              handleSetGroupState={handleSetGroupState}
              handleVeredict={handleVeredict}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Minutes;
