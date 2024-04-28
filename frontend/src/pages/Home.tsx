import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="md:mx-7 mx-5 mt-16 h-full">
        <div className="flex flex-row h-full">
          <div className="lg:block hidden">
            <Sidebar />
          </div>
          <div className="lg:ml-60 w-full h-full lg:pl-9 pt-5 pb-9 flex lg:justify-start justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
