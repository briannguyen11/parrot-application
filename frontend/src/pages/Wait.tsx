import { Button } from "@/components/ui/button";
import { EMAIL } from "@/constants";

import api from "../api";
import { useNavigate } from "react-router-dom";

const Wait = () => {
  const navigate = useNavigate();

  // TODO: Need to test this with no access token
  const handleSendEmailVerfication = async () => {
    const data = { email: sessionStorage.getItem(EMAIL) };
    try {
      const res = await api.post("/api/users/auth/resend/", data);
      console.log(res);
    } catch (error) {
      console.error("Error sending new email link", error);
    }
  };

  const renderWaitForEmail = () => {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-center">
          An email has been sent to verify your email
        </h2>

        <div className="flex flex-col">
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full mt-4 mb-4">
              <img
                src="../../icon.svg"
                alt="logo"
                className="w-24 h-24 object-cover select-none"
              />
            </div>
          </div>
          <Button
            className="text-center text-xl mt-8 w-full"
            onClick={() => navigate("/login")}
          >
            Return to Login
          </Button>
          <div className="flex justify-between mt-4">
            <p
              className="text-slate-400 hover:text-black hover:underline"
              onClick={() => navigate("/")}
            >
              {"<- Back"}
            </p>
            <p
              className="text-slate-400  hover:text-black hover:underline"
              onClick={() => handleSendEmailVerfication()}
            >
              Resend Email Link
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full p-10">
      <div className="flex items-center justify-center p-10">
        <div className="w-[400px]">
          <div className="mt-16 ">{renderWaitForEmail()}</div>
        </div>
      </div>
    </div>
  );
};

export default Wait;
