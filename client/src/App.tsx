import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { GlobalStyle } from "./styles/global";
import { Router } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import { OccupationProvider } from "./hooks/occupations";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <OccupationProvider>
            <Router />
          </OccupationProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
