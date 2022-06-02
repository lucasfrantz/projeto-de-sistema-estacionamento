import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { GlobalStyle } from "./styles/global";
import { Router } from "./routes";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
