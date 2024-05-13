import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "../api";
import ProfilePictureInput from "@/components/profile/ProfilePictureInput";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, EMAIL, REFRESH_TOKEN } from "@/constants";
import { jwtDecode } from "jwt-decode";

const Onboard = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [resume, setResume] = useState<File>();
  const [pfp, setPfp] = useState<File>();
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [slide, setSlide] = useState(1);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  const navigate = useNavigate();

  const pollingInterval = 5000;

  const checkEmailVerified = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (accessToken) {
      const decoded: { email_verified: boolean } = jwtDecode(accessToken);
      const verified: boolean = decoded.email_verified;
      if (verified) {
        setEmailVerified(true);
      } else {
        try {
          const res = await api.post("api/users/auth/refresh-token/", {
            refresh_token: refreshToken,
          });
          console.log(res);
          localStorage.setItem(ACCESS_TOKEN, res.data.access_token.idToken);
          localStorage.setItem(
            REFRESH_TOKEN,
            res.data.access_token.refreshToken
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkEmailVerified, pollingInterval);
    if (emailVerified) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [emailVerified]);

  // TODO: Need to test this
  const handleSendEmailVerfication = async () => {
    const data = { email: localStorage.getItem(EMAIL) };
    try {
      const res = await api.post("/api/users/auth/resend/", data);
      console.log(res);
    } catch (error) {
      console.error("Error sending new email link", error);
    }
  };

  const handleSubmit = async () => {
    const profileData = new FormData();
    profileData.append("first_name", firstName);
    profileData.append("last_name", lastName);
    profileData.append("school", school);
    profileData.append("major", major);
    profileData.append("bio", bio);
    profileData.append("linkedin", linkedin);
    profileData.append("github", github);
    if (resume) {
      profileData.append("resume", resume);
    }
    if (pfp) {
      profileData.append("profile_picture", pfp);
    }

    try {
      const res = await api.post("/api/profiles/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert("Profile already exists");
      navigate("/profile");
    }
  };

  const renderInfoForm = () => {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-center">
          Welcome to Parrot
        </h2>
        <p className="text-slate-400 text-center mt-2">
          Lets's start your profile so you can connect with people with cool
          ideas or share your own!
        </p>
        <div className="mt-4">
          <ProfilePictureInput pfp={null} setPfp={setPfp} />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Your Name *</h3>
          <div className="flex gap-2 my-1">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="border border-border rounded-lg p-2 text-sm outline-black w-full"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="border border-border rounded-lg p-2 text-sm outline-black w-full"
              required
            />
          </div>
        </div>
        <div className="flex-col mt-4">
          <h3 className="txext-md font-semibold"> School</h3>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="(Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="txext-md font-semibold"> Major</h3>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="(Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Bio</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Something About Yourself (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => {
            if (firstName !== "" && lastName !== "") {
              setSlide(slide + 1);
            } else {
              alert("Please enter first and last name");
            }
          }}
        >
          Next
        </Button>
      </div>
    );
  };

  const renderLinksForm = () => {
    return (
      <div className="w-full">
        <Button
          className="bg-transparent text-black text-md hover:underline p-0"
          onClick={() => setSlide(slide - 1)}
        >
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-center">Additional Links</h2>
        <p className="text-slate-400 text-center mt-2">
          Add your resume and other links so people can get to know you better!
        </p>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Resume</h3>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setResume(e.target.files[0]);
              }
            }}
            accept=".pdf"
            className="border border-border rounded-lg p-2 text-sm  w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">LinkedIn</h3>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Enter link here (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <div className="flex-col mt-4">
          <h3 className="text-md font-semibold">Github</h3>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="Enter link here (Optional)"
            className="border border-border rounded-lg p-2 text-sm outline-black w-full"
          />
        </div>
        <Button className="w-full mt-4" onClick={() => setSlide(slide + 1)}>
          Next
        </Button>
      </div>
    );
  };

  const renderVerifiyEmail = () => {
    return (
      <div className="w-full">
        <Button
          className="bg-transparent text-black text-md hover:underline p-0"
          onClick={() => setSlide(slide - 1)}
        >
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-center">
          Verify Your Email
        </h2>
        <p className="text-slate-400 text-center mt-2">
          An email has been sent to verify your email
        </p>
        {!emailVerified ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-red-500"></div>
            </div>
            <Button
              className="text-center text-slate-400 bg-transparent hover:text-blue-500 hover:underline mt-2"
              onClick={() => handleSendEmailVerfication}
            >
              Resend Email Link
            </Button>
          </div>
        ) : (
          <>
            <p className="text-green-500 text-center font-semibold mt-4">
              Verified
            </p>
            <Button className="w-full mt-4" onClick={() => handleSubmit()}>
              Finish
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="h-full w-full p-10">
        <div className="flex gap-2">
          <img
            src="../../icon.svg"
            alt="logo"
            className="w-8 h-8 object-cover select-none"
            onClick={() => navigate("/")}
          />
          <h1 className="text-[23px] font-medium text-primary lg:block hidden select-none">
            PARROT
          </h1>
        </div>

        <div className="flex items-center justify-center p-10">
          <div className="w-[600px]">
            <div className="mt-16">{slide === 1 && renderInfoForm()}</div>
            <div className="mt-16 ">{slide === 2 && renderLinksForm()}</div>
            <div className="mt-16 ">{slide === 3 && renderVerifiyEmail()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboard;
