import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBimester,
  setGroup,
  setGrade,
} from "../../redux/options/optionActions";

import {
  allBimesters,
  allGrades,
  groupsByGrade,
} from "../../redux/options/initialState";

import "./options.styles.scss";

const Options = () => {
  let [bimester, changeBimester] = useState(
    useSelector((state) => state.options.bimester)
  );

  let [group, changeGroup] = useState(
    useSelector((state) => state.options.group)
  );

  let [grade, changeGrade] = useState(
    useSelector((state) => state.options.grade)
  );

  const dispatch = useDispatch();

  const handleChangeBimester = (e) => {
    changeBimester(e.target.value);
    dispatch(setBimester(e.target.value));
  };

  const handleChangeGroup = (e) => {
    changeGroup(e.target.value);
    dispatch(setGroup(e.target.value));
  };

  const handleChangeGrade = (e) => {
    const currentGrade = e.target.value;
    changeGrade(currentGrade);
    dispatch(setGrade(currentGrade));
    const firstGroup = groupsByGrade[currentGrade][0];
    changeGroup(firstGroup);
    dispatch(setGroup(firstGroup));
  };

  return (
    <div className="options-container">
      <div className="title">
        <h1>
          Mapa de Notas &mdash; {grade}º ano &mdash; {group}
        </h1>
      </div>
      <div className="options">
        <div className="option">
          <label htmlFor="grade">Série: </label>
          <select name="grade" value={grade} onChange={handleChangeGrade}>
            {allGrades.map((grade) => (
              <option value={grade} key={`grade-${grade}`}>
                {grade}ª
              </option>
            ))}
          </select>
        </div>

        <div className="option">
          <label htmlFor="group">Turma: </label>
          <select name="group" value={group} onChange={handleChangeGroup}>
            {groupsByGrade[grade].map((groupName) => (
              <option
                value={groupName}
                key={`group-${groupName.split(" ")[0]}`}
              >
                {groupName}
              </option>
            ))}
          </select>
        </div>

        <div className="option">
          <label htmlFor="bimester">Bimestre: </label>
          <select
            name="bimester"
            value={bimester}
            onChange={handleChangeBimester}
          >
            {allBimesters.map((bim) => (
              <option value={bim} key={`bim-${bim}`}>
                {bim}º
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Options;
