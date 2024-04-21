import { useState } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import Feed from "@/components/Feed";
export default function Home() {
  return (
    <>
      <Navbar />

      {/* This is the content div */}
      <div className="lg:mx-16 md:mx-10 mx-5 mt-16 h-full">
        <div className="flex flex-row h-full">
          <Sidebar />

          <Feed />
        </div>
      </div>
    </>
  );
}
