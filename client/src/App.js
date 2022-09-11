//import logo from './logo.svg';
import React, { Fragment } from "react";
import "./App.css";

import InputUrl from "./components/InputUrl";
import ListUrls from "./components/ListUrls";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container">
        <InputUrl />
        <ListUrls />
      </div>
    </Fragment>
  );
}

export default App;
