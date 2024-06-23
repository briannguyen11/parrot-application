import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import OpenForm from "@/components/create/OpenForm";
import ShowcaseForm from "@/components/create/ShowcaseForm";
import { UserAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [form, setForm] = useState<string>("open");
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleRadioChange = (value: string) => {
    setForm(value);
  };

  const renderFormButton = () => {
    return (
      <RadioGroup
        defaultValue={form}
        onValueChange={handleRadioChange}
        className="flex flex-inline mt-5"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="open" id="r1" />
          <Label htmlFor="r1">Open Project</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="showcase" id="r2" />
          <Label htmlFor="r2">Showcase Project</Label>
        </div>
      </RadioGroup>
    );
  };

  const renderForm = (form: string) => {
    if (form === "open") {
      return <OpenForm />;
    } else if (form === "showcase") {
      return <ShowcaseForm />;
    }
  };

  useEffect(() => {
    document.title = "Create Project";
    if (user === null) {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  return (
    <>
      
      <div className="md:mx-7 mx-5 relative w-full">
        <div className="absolute top-0 left-0 right-0 h-full flex justify-center">
          <div className="mt-9 w-[700px] h-[600px] ">
            <h2 className="text-2xl font-semibold text-primary">
              Create Project
            </h2>
            {renderFormButton()}
            {renderForm(form)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
