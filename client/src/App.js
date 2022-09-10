//import logo from './logo.svg';
import React, { Fragment } from "react";
import './App.css';

import InputUrl from "./components/InputUrl";
import ListUrls from "./components/ListUrls";
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputUrl />
        <ListUrls />
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
