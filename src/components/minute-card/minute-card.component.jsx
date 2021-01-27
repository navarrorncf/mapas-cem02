import React from "react";

import "./minute-card.styles.scss";

import getFailedSubjectNames from "../../utils/getFailedSubjectNames";
import getAttendance from "../../utils/getAttendance";

const MinuteCard = ({ student }) => {
  const failedSubjects = getFailedSubjectNames(student);
  const attendance = getAttendance(student);

  return (
    <div className="minutes-card">
      <h3 className="name">{student.name}</h3>
      <div className="card-container">
        {failedSubjects.map((subject) => {
          const key = `${student.code}-${subject}-card`;
          return (
            <div className="subject-cart">
              <h4>{subject}</h4>
              <select name={key} id={key} key={key}>
                <option value="ap">Aprovado</option>
                <option value="rec-ok">Recuperado</option>
                <option value="apc">AP**</option>
                <option value="rep" defaultSelected>
                  Reprovado
                </option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MinuteCard;
