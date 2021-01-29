import React from "react";

import "./minute-card.styles.scss";

import getAttendance from "../../utils/getAttendance";

const MinuteCard = ({ student, handleSetGroupState, handleVeredict }) => {
  const attendance = getAttendance(student);
  const { name, code, failedSubjects } = student;

  return (
    <div className={`minute-card`}>
      <h3 className="name">
        {name} ({code})
      </h3>
      <h4>Faltas: {attendance}</h4>
      <div
        className="veredict"
        onChange={(e) => handleVeredict(code, e.target.value)}
      >
        <div className="form-group">
          <input
            type="radio"
            name={`veredict-${code}`}
            id={`veredict-${code}-rep`}
            value="rep"
            defaultChecked
          />
          <label htmlFor={`veredict-${code}-rep`}>REP</label>
        </div>
        <div className="form-group">
          <input
            type="radio"
            name={`veredict-${code}`}
            id={`veredict-${code}-ap`}
            value="ap"
          />
          <label htmlFor={`veredict-${code}-ap`}>AP</label>
        </div>
        <div className="form-group">
          <input
            type="radio"
            name={`veredict-${code}`}
            id={`veredict-${code}-apc`}
            value="apc"
          />
          <label htmlFor={`veredict-${code}-apc`}>AP**</label>
        </div>
      </div>
      <div className="card-container">
        {failedSubjects.map((subject) => {
          const key = `${code}-${subject}-card`;

          return (
            <div className="subject-card" key={key}>
              <h4>{subject}</h4>
              <select
                name={key}
                id={key}
                defaultValue="rep"
                onChange={(e) =>
                  handleSetGroupState(code, subject, e.target.value)
                }
              >
                <option value="ap">Aprovado</option>
                <option value="rep">Reprovado</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MinuteCard;
