import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import Options from "./components/options/options.component";
import Table from "./components/table/table.component";
import ReportCard from './components/report-card/report-cart.component';
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Options />
        <ReportCard />
        <Table />
      </div>
    </Provider>
  );
};

export default App;
