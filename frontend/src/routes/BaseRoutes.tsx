// EquipmentRoutes.js

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Feed from "../components/Feed";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// Contains routes for pages that use sidebar and navbar, like Feed and Showcase
const BaseRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="md:mx-10 mx-5 mt-16 h-full">
        <div className="flex flex-row h-full">
          <div className="lg:block hidden ">
            <Sidebar />
          </div>
          <div className="lg:ml-64 w-full h-full lg:pt-5 lg:pl-5 pt-5">
            <Routes>
              <Route Component={Feed} path="/" />
              <Route Component={Profile} path="spotlight" />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseRoutes;
