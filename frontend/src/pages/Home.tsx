import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="md:mx-10 mx-5 mt-16 h-full">
        <div className="flex flex-row h-full">
          <div className="lg:block hidden">
            <Sidebar />
          </div>
          <div className="lg:ml-64 w-full h-full lg:pt-9 lg:pl-9 pt-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
