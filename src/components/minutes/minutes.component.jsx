import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePassedSubjects,
  updateVeredict,
  setOngoingCases,
} from "../../redux/options/optionActions";

import "./minutes.styles.scss";

import filterMap from "../../utils/filterMap";
import generateMeetingMinutes from "../../utils/generateMeetingMinutes";
import getFailedSubjectNames from "../../utils/getFailedSubjectNames";
import getFailedSubjects from "../../utils/getFailedSubjects";
import updatePassedSubjectsUtil from "../../redux/options/updatePassedSubjects";

import MinuteCard from "../minute-card/minute-card.component";

import reportCards from "../../dev-data/reportCards.json";

const Minutes = () => {
  const { group } = useSelector((state) => state.options);

  const currentGroupData = reportCards.filter(
    (reportCard) => reportCard.group === group
  );

  let [groupState, setGroupState] = useState(
    useSelector((state) => state.options.ongoingCases)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const ongoing = filterMap(currentGroupData, "ongoing").map((student) => {
      let veredict = "rep";
      if (getFailedSubjects(student) < 3) {
        veredict = "apc";
      }
      return {
        veredict,
        ...student,
      };
    });

    setGroupState(ongoing);
    dispatch(setOngoingCases(ongoing));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  const handleSetGroupState = (code, subject, status) => {
    setGroupState(
      updatePassedSubjectsUtil(groupState, {
        code,
        subject,
        status,
      })
    );
    dispatch(updatePassedSubjects({ code, subject, status }));
  };

  const handleVeredict = (code, payload) => {
    const newGroupState = groupState.map((student) => {
      if (student.code === code) {
        return {
          ...student,
          veredict: payload,
        };
      }
      return student;
    });
    setGroupState(newGroupState);
    dispatch(updateVeredict({ code, veredict: payload }));
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
              groupState.forEach((student) => {
                let failedSubjectsCount = getFailedSubjects(student);
                if (
                  student.veredict === "rep" &&
                  (failedSubjectsCount < 3 ||
                    (student.passed &&
                      failedSubjectsCount - student.passed.length < 3))
                ) {
                  return alert(
                    "Erro: existe algum estudante reprovado por menos de 3 disciplinas?"
                  );
                }
              });
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
        {groupState.map((student) => {
          return (
            <MinuteCard
              student={student}
              key={`minute-${student.code}`}
              handleSetGroupState={handleSetGroupState}
              handleVeredict={handleVeredict}
              failedSubjects={getFailedSubjectNames(student)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Minutes;
