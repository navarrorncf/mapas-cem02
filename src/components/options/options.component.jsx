import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGroup,
  setGrade,
  setFilterMode,
} from "../../redux/options/optionActions";

import { allGrades, groupsByGrade } from "../../redux/options/initialState";

import "./options.styles.scss";

const Options = () => {
  let [group, changeGroup] = useState(
    useSelector((state) => state.options.group)
  );

  let [grade, changeGrade] = useState(
    useSelector((state) => state.options.grade)
  );

  let [filter, changeFilter] = useState(
    useSelector((state) => state.options.filterMode)
  );

  const dispatch = useDispatch();

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

  const handleChangeFilter = (e) => {
    const currentFilter = e.target.value;
    changeFilter(currentFilter);
    dispatch(setFilterMode(currentFilter));
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
          <label htmlFor="filter">Filtro: </label>
          <select name="filter" value={filter} onChange={handleChangeFilter}>
            <option value="none">Nenhum</option>
            <option value="passed">Aprovados</option>
            <option value="ongoing">Não Aprovados</option>
            <option value="rec">Em Recuperação</option>
            <option value="failed">Reprovados</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Options;
