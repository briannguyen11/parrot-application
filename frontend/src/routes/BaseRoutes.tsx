// EquipmentRoutes.js

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";

const BaseRoutes = () => {
  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Profile} path="/profile" />
    </Routes>
  );
};

export default BaseRoutes;
