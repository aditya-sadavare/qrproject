import React from "react";
import "./App.css";

import "./bootstrap/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Sidebar />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Router>
  );
}

export default App;
