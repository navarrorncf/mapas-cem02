import React from "react";

import "./table-row.styles.scss";

import cssClass from "../../utils/cssClass";
import shortenString from "../../utils/shortenString";
import getAttendance from "../../utils/getAttendance";
import getGradesTotal from "../../utils/getGradesTotal";
import getFailedSubjects from "../../utils/getFailedSubjects";

const recCssClass = (rec) =>
  rec === 0
    ? "ss"
    : rec === 1
    ? "ms"
    : rec === 2
    ? "mm"
    : rec === 3
    ? "mi"
    : "ii";

const TableRow = ({ student, headers, bimester, failedSubjects }) => {
  const studentObject = Object.assign(
    { NAME: student.name, F: getAttendance(student) },
    getGradesTotal(student)
  );

  return (
    <tr>
      {headers
        .map((el) =>
          el !== "F" && !/(PD1|PD3)/.test(el) ? (
            <td
              className={`${el === "NOME" ? el : "sub"} ${cssClass(
                el,
                studentObject[el],
                student
              )}`}
              key={`sd-${student.code}-${el}`}
            >
              {el === "NOME"
                ? shortenString(student["name"], 30)
                : studentObject[el].toFixed(2)}
            </td>
          ) : (
            "" // TODO: Exchange "" for attendance with css classes
          )
        )
        .filter((el) => el !== "")}
      <td
        className={`sub ${recCssClass(getFailedSubjects(student))}`}
        key={`sd-${student.code}-REC`}
      >
        {getFailedSubjects(student)}
      </td>
    </tr>
  );
};

export default TableRow;
