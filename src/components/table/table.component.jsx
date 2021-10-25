import React from "react";
import { useSelector } from "react-redux";
import TableRow from "../table-row/table-row.component";

import reportCards from "../../dev-data/reportCards.json";

import getBimester from "../../utils/getBimester";
import filterMap from "../../utils/filterMap";

import "./table.styles.scss";

const Table = () => {
  const { group, filterMode } = useSelector((state) => state.options);

  const currentMap = reportCards.filter(
    (reportCard) => reportCard.group === group
  );

  const filteredMap = filterMap(currentMap, filterMode);

  let headers, bimester;

  if (filteredMap.length) {
    headers = Object.keys(filteredMap[0].grades);
    headers.sort();
    headers.unshift("NOME");
    headers.push("F");
    bimester = getBimester(filteredMap);
  }

  return filteredMap.length ? (
    <div className="table-container">
      <table className="table">
        <thead className="table--head">
          <tr>
            {headers
              .filter((el) => !/(PD1|PD3)/.test(el))
              .map((header) =>
                header !== "F" ? (
                  <th
                    key={`head-${header}`}
                    className={header === "NOME" ? `head ${header}` : "sub"}
                  >
                    {header}
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
          {filteredMap.map((student) => (
            <TableRow
              student={student}
              headers={headers}
              bimester={bimester}
              key={`student-${student.code}`}
            />
          ))}
        </tbody>
        <tfoot className="table--head">
          <tr>
            {headers
              .filter((el) => !/(PD1|PD3)/.test(el))
              .map((header) =>
                header !== "F" ? (
                  <th
                    key={`head-${header}`}
                    className={header === "NOME" ? `head ${header}` : "sub"}
                  >
                    {header}
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
  ) : (
    <div className="no-students">
      <span>Nenhum estudante atende a esses critérios.</span>
    </div>
  );
};

export default Table;
