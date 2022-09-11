//import logo from './logo.svg';
import React, { Fragment } from "react";
import './App.css';

import InputUrl from "./components/InputUrl";
import ListUrls from "./components/ListUrls";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputUrl />
        <ListUrls />
      </div>
    </Fragment>
  );
}

export default App;
