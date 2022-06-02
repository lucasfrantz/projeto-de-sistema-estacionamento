import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        {/* <Route path="register"><Users /></Route> */}
        {/* <Route path="dashboard"><Home /></Route> */}
      </Routes>
    </BrowserRouter>
  );
};
