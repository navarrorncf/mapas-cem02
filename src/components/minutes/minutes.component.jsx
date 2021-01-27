import React from "react";
import { useSelector } from "react-redux";

import "./minutes.styles.scss";

import filterMap from "../../utils/filterMap";

import MinuteCard from "../minute-card/minute-card.component";

import reportCards from "../../dev-data/reportCards.json";

const Minutes = () => {
  const { group } = useSelector((state) => state.options);

  const currentGroupData = reportCards.filter(
    (reportCard) => reportCard.group === group
  );

  const ongoing = filterMap(currentGroupData, "ongoing");

  const thingsToFix = {};

  return (
    <div className="minutes-container">
      <div className="minutes">
        <h2>Ata &mdash; {group}</h2>
        {ongoing.map((student) => (
          <MinuteCard student={student} />
        ))}
      </div>
    </div>
  );
};

export default Minutes;
