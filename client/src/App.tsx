import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { GlobalStyle } from "./styles/global";
import { Router } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
