import Navbar from "@/components/navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch"

const Settings = () => {
  useEffect(() => {
    document.title = `Settings | Parrot`;
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  mt-16 w-full">
        <div className="p-10 md:w-1/2 min-w-[700px] w-full">
            <p onClick={()=>navigate(-1)} className="text-sm text-secondary-foreground underline cursor-pointer">{'<- Back'}</p>
          <h1 className="mt-5 font-semibold text-2xl text-left">Settings</h1>

          <div className="mt-12 pb-5 border-b flex flex-row justify-between items-end">
            <div>
            <h2 className="font-light text-primary">Appearance</h2>

            <p className=" font-extralight text-secondary mt-2">Light</p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
