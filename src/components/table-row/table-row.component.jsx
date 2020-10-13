import React from "react";

import "./table-row.styles.scss";

import calcCssClass from "../../utils/calcCssClass";
import shortenString from "../../utils/shortenString";

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

const TableRow = ({ student, bimester, headers, failedSubjects }) => (
  <tr>
    {headers
      .map((el) =>
        el !== "F" ? (
          <td
            className={`${
              ["NUM", "NOME"].includes(el) ? el : "sub"
            } ${calcCssClass(el, student[el], bimester, 2)}`}
            key={`sd-${student.NUM}-${el}`}
          >
            {el === "NOME"
              ? shortenString(student[el], 30)
              : el !== "NUM"
              ? student[el].toFixed(2)
              : student[el]}
          </td>
        ) : (
          ""
        )
      )
      .filter((el) => el !== "")}
    <td
      className={`sub ${recCssClass(failedSubjects)}`}
      key={`sd-${student.NUM}-REC`}
    >
      {failedSubjects}
    </td>
  </tr>
);

export default TableRow;
