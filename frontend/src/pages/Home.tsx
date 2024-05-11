import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="mt-16 h-full ">
        <div className="md:px-7 px-5 bg-slate-50 bg-fixed flex flex-row h-full min-h-home">
          <div className="lg:block hidden bg-white">
            <Sidebar />
          </div>
          <div className="lg:ml-56 w-full h-full lg:pl-1 flex lg:justify-start justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
