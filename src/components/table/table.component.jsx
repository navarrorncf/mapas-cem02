import React from "react";
import { useSelector } from "react-redux";
import TableRow from "../table-row/table-row.component";

import studentsData from "../../dev-data/output.json";

import "./table.styles.scss";

const Table = () => {
  const { bimester, group } = useSelector((state) => state.options);

  const currentMap = studentsData[group][bimester];
  const { failedSubjects, headers } = currentMap.metadata;
  const { data } = currentMap;

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table--head">
          <tr>
            {headers
              .map((header) =>
                header !== "F" ? (
                  <th
                    key={`head-${header}`}
                    className={
                      ["NUM", "NOME"].includes(header)
                        ? `head ${header}`
                        : "sub"
                    }
                  >
                    {header === "NUM" ? "Nº" : header}
                  </th>
                ) : (
                  ""
                )
              )
              .filter((el) => el !== "")}
            <th key={`head-REC`} className="sub">
              REC
            </th>
          </tr>
        </thead>
        <tbody className="table--body">
          {Object.values(data).map((student) => (
            <TableRow
              student={student}
              bimester={bimester}
              headers={headers}
              failedSubjects={failedSubjects[student.NUM]}
              key={`student-${student.NUM}`}
            />
          ))}
        </tbody>
        <tfoot className="table--head">
          <tr>
            {headers
              .map((header) =>
                header !== "F" ? (
                  <th
                    key={`head-${header}`}
                    className={
                      ["NUM", "NOME"].includes(header)
                        ? `head ${header}`
                        : "sub"
                    }
                  >
                    {header === "NUM" ? "Nº" : header}
                  </th>
                ) : (
                  ""
                )
              )
              .filter((el) => el !== "")}
            <th key={`head-REC`} className="sub">
              REC
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
