import React from "react";

import brasao from "../../assets/images/brasao-df.png";
import logo from "../../assets/images/logo128.png";

import "./report-card.styles.scss";

const ReportCard = () => {
  const handleClick = (e) => {
    const reportContainer = document.querySelector("#report-card-container");

    /*     document.addEventListener("keyup", handleEsc, false); */
    reportContainer.classList.add("closed");
  };

  /* const handleEsc = (e) => {
    if (e.keyCode !== 27) {
      return;
    }

    const reportContainer = document.querySelector("#report-card-container");
    reportContainer.classList.remove("closed");
    document.removeEventListener("keyup", handleEsc);
  }; */

  return (
    <div className="report-card-container" id="report-card-container">
      <div className="report-card">
        <div className="close-button" onClick={handleClick}>
          ✕
        </div>
        <div className="chevron-right">❱</div>
        <div className="chevron-left">❰</div>
        <div className="report-card--data">
          <div className="heading">
            <div className="image-container">
              <img src={logo} alt="Brsão do " />
            </div>
            <h3>
              Governo do Distrito Federal
              <br />
              Secretaria de Estado de Educação
              <br />
              Coordenação Regional de ensino de Brazlândia
              <br />
              Centro de Ensino Médio 02
            </h3>
            <div className="image-container">
              <img src={brasao} alt="Brsão do " />
            </div>
          </div>
          <div className="student-data">
            <p>Nome: Lorem ipsum dolor sit</p>
            <p>Nascimento: 31/02/2052</p>
            <p>Série: 9ª série</p>
            <p>Turma: do Pagode</p>
          </div>
          <div className="grades-data">
            <table>
              <thead>
                <tr>
                  <th rowSpan="2" className="disciplinas">
                    BLOCO A
                  </th>
                  <th colSpan="2">1º Bimestre</th>
                  <th colSpan="2">2º Bimestre</th>
                  <th rowSpan="2" className="disciplinas">
                    BLOCO B
                  </th>
                  <th colSpan="2">3º Bimestre</th>
                  <th colSpan="2">4º Bimestre</th>
                </tr>
                <tr>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                  <th className="coluna">Notas</th>
                  <th className="coluna">Faltas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
                <tr>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="disciplinas">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                  <td className="coluna">x</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total de Faltas: X</th>
                </tr>
                <tr>
                  <th>Recuperação em Y Disciplinas</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
