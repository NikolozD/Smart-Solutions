import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersPage from "./UsersPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route></Route>
        <Route path="/users" element={<App />} />
        <Route path="/users/:id" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
