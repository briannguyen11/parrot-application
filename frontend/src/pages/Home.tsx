import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Profile from "./Profile";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="md:mx-10 mx-5 mt-16 h-full">
        <div className="flex flex-row h-full">
          <div className="lg:block hidden">
            <Sidebar />
          </div>
          <div className="lg:ml-64 w-full h-full lg:pt-5 lg:pl-5 pt-5">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
