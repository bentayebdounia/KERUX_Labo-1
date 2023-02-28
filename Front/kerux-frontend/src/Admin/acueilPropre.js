import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../bootstrap-icons-1.9.1/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./acueil.css";
import Navbar from "./navAdmin/navbar";
import Sidebar from "./sibeBar/sidebar";

const AcueilPropre = (props) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};
export default AcueilPropre;
