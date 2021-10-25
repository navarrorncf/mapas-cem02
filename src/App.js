import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import Options from "./components/options/options.component";
import Table from "./components/table/table.component";
import ReportCard from "./components/report-card/report-card.component";
// import Minutes from "./components/minutes/minutes.component";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Options />
        <ReportCard />
        <Table />

        {/* Only active in the end of the school year */}
        {/* <Minutes /> */}
      </div>
    </Provider>
  );
};

export default App;
