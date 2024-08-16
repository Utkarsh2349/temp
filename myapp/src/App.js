import "./App.css";
import React from "react";
import Register from "./Component/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      {/* <h1>Hi</h1> */}
      
      <Register />
      <ToastContainer theme="dark"/>
    </div>
  );
}

export default App;
