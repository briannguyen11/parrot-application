import Navbar from "@/components/Navbar";
import TechStackInput from "@/components/TechStackInput";
import { useState } from "react";
import Tag from "@/components/Tag";
import FeedCard from "@/components/FeedCard";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@/components/Tooltip";

const Create = () => {
  const [techStack, setTechStack] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [groupSize, setGroupSize] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [slide, setSlide] = useState<number>(0);
  const [showError, setShowError] = useState<boolean>(false);

  const navigate = useNavigate();

  const addTechStack = (tech: string) => {
    if (techStack.includes(tech)) {
      return;
    }
    setTechStack([...techStack, tech]);
  };

  const clearTechStack = () => {
    setTechStack([]);
  };

  const currentDate = new Date().toLocaleDateString();

  // Hardocded user data, replace when auth state is passed
  const user = {
    name: "Quandale Dingle",
    profilePicture:
      "https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI",
    userBio: "Software Engineer at Cal State Fullerton",
  };

  const handlePost = () => {
    // Post project
    alert("Project posted");

    // Redirect to Project Page but for now redirect to home
    navigate("/");
  };

  const handleShowError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const renderError = () => {
    return (
      <>
        {techStack.length < 1 && (
          <p className="text-sm text-red-500 mt-5">
            Please select at least one technology for your project
          </p>
        )}
        {projectDescription.length < 10 && (
          <p className="text-sm text-red-500 mt-5">
            Please input a description of at least ten characters
          </p>
        )}
        {projectName.length < 3 && (
          <p className="text-sm text-red-500 mt-5">
            Please select a longer project name
          </p>
        )}
        {groupSize < 2 && (
          <p className="text-sm text-red-500 mt-5">
            Group size must be greater than 1
          </p>
        )}
      </>
    );
  };

  const renderForm = () => {
    return (
      <div className="mt-9 w-[700px] h-[600px] flex flex-col">
        <h2 className="text-2xl font-semibold text-primary">Create Project</h2>
        <div className="flex items-center gap-5">
          <div className="flex-col">
            <div className="mt-5 flex gap-2 items-center">
              <h3 className="text-md font-semibold text-primary">
                Project Name
              </h3>
              <Tooltip
                title="Naming your project"
                text="Please create a name that concisely summarizes/names your project. Simple is better!"
              />
            </div>

            <input
              type="text"
              placeholder="Enter project name"
              className="border border-border rounded-lg p-2 w-72 mt-2 text-sm outline-none"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            />
          </div>
          <div className="flex-col">
            <div className="mt-5 flex gap-2 items-center">
              <h3 className="text-md font-semibold text-primary">Group Size</h3>
              <Tooltip
                title="Group Size"
                text="Please select the number of people you need to work on this project (2-5 recommended)."
              />
            </div>
            <input
              type="number"
              placeholder="0"
              className="border border-border rounded-lg p-2 w-20 mt-2 text-sm outline-none"
              onChange={(e) => setGroupSize(parseInt(e.target.value))}
              value={groupSize}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2 items-center">
          <h3 className="text-md font-semibold text-primary">Description</h3>
          <Tooltip
            title="Project Description"
            text="Please provide a detailed description of your project. This will help others understand your project better."
          />
        </div>
        <textarea
          placeholder="Enter project description"
          className="border border-border rounded-lg p-2 w-3/3 mt-2 h-20 min-h-10 max-h-28 text-sm outline-none"
          onChange={(e) => setProjectDescription(e.target.value)}
          value={projectDescription}
        />

        <div className="mt-7 flex gap-2 items-center">
          <h3 className="text-md font-semibold text-primary">
            Difficulty Level
          </h3>
          <Tooltip
            title="Difficulty Level"
            text="Please select the difficulty level of your project. This will help others understand the complexity of your project."
          />
        </div>
        <div className="mt-4 flex items-center gap-5">
          {difficultyLevel !== "Beginner" ? (
            <button
              onClick={() => setDifficultyLevel("Beginner")}
              className="p-3 border border-card-green border-dashed rounded-xl w-full  hover:bg-card-green hover:text-white transition duration-300 ease-in-out"
            >
              Beginnner
            </button>
          ) : (
            <button className="p-3 border border-card-green border-dashed rounded-xl w-full bg-card-green text-white transition duration-300 ease-in-out">
              Beginnner
            </button>
          )}

          {difficultyLevel !== "Intermediate" ? (
            <button
              onClick={() => setDifficultyLevel("Intermediate")}
              className="p-3 border border-card-yellow border-dashed rounded-xl w-full hover:bg-card-yellow hover:text-white transition duration-300 ease-in-out"
            >
              Intermediate
            </button>
          ) : (
            <button className="p-3 border border-card-yellow border-dashed rounded-xl w-full bg-card-yellow text-white transition duration-300 ease-in-out">
              Intermediate
            </button>
          )}

          {difficultyLevel !== "Advanced" ? (
            <button
              onClick={() => setDifficultyLevel("Advanced")}
              className="p-3 border border-card-red border-dashed rounded-xl w-full  hover:bg-card-red hover:text-white transition duration-300 ease-in-out"
            >
              Advanced
            </button>
          ) : (
            <button className="p-3 border border-card-red border-dashed rounded-xl w-full bg-card-red text-white transition duration-300 ease-in-out">
              Advanced
            </button>
          )}
        </div>

        <div className="mt-7 mb-3 flex gap-5 items-center">
          <div className="flex gap-2 items-center">
            <h3 className=" text-md font-semibold text-primary">Tech Stack</h3>

            <Tooltip
              title="Tech Stack"
              text="Please select the technologies you will be using for your project."
            />
          </div>

          <button
            onClick={clearTechStack}
            className="text-sm text-gray-400 underline"
          >
            Clear
          </button>
        </div>

        <TechStackInput addTechStack={addTechStack} />

        <div className="mt-5 flex gap-x-3 gap-y-3 flex-wrap h-10">
          {techStack.map((tech) => (
            <Tag name={tech} />
          ))}
        </div>

        {groupSize > 1 &&
        projectName.length > 3 &&
        projectDescription.length > 10 &&
        techStack.length > 0 ? (
          <button
            onClick={() => setSlide(1)}
            className="mt-7 bg-primary text-white rounded-lg py-2"
          >
            Preview Card
          </button>
        ) : (
          <button
            onClick={handleShowError}
            className="mt-7 bg-primary text-white rounded-lg py-2 opacity-50"
          >
            Preview Card
          </button>
        )}

        {showError && renderError()}
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="mt-7 w-[700px] h-[600px] flex flex-col">
        <p
          onClick={() => setSlide(0)}
          className="hover:cursor-pointer text-sm font-light text-secondary-foreground underline"
        >
          {"<- Resume Editing"}
        </p>
        <h2 className="mt-2 mb-5 text-2xl font-semibold text-primary">
          Preview Project
        </h2>
        <FeedCard
          title={projectName}
          description={projectDescription}
          tags={techStack}
          postedTime={currentDate}
          userBio={user.userBio}
          name={user.name}
          groupSize={groupSize}
          profilePicture={user.profilePicture}
        />

        <button
          onClick={handlePost}
          className="mt-7 bg-primary text-white rounded-lg py-2"
        >
          Post
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="md:mx-7 mx-5 mt-16 relative">
        <div className="absolute top-0 left-0 right-0 h-full flex justify-center">
          {slide === 0 && renderForm()}
          {slide === 1 && renderPreview()}
        </div>
      </div>
    </>
  );
};

export default Create;
