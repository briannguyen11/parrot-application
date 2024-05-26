import { useState } from "react";
import { Tooltip } from "@/components/Tooltip";

import TechStackInput from "@/components/TechStackInput";
import PictureInput from "./PictureInput";
import Tag from "@/components/Tag";

import api from "@/api";
import { useNavigate } from "react-router-dom";

interface Photo {
  photo: File;
  caption: string;
}

const ShowcaseForm = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
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

  const addPhoto = (photo: Photo) => {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
  };

  const deletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const renderPhotos = (): JSX.Element[] => {
    return photos.map((photo, index) => (
      <div key={index} className="flex flex-inline gap-4 items-center mt-2">
        <img
          src={URL.createObjectURL(photo.photo)}
          alt={"photo" + index}
          className="w-32 h-auto rounded-md"
        />
        <div className="flex flex-col">
          <p className="text-slate-400">Caption for photo {index + 1}:</p>
          <p>{photo.caption}</p>
        </div>
        <button
          className="bg-red-500 text-white rounded-md px-2 py-1 ml-auto"
          onClick={() => deletePhoto(index)}
        >
          delete
        </button>
      </div>
    ));
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
        {photos.length < 1 && (
          <p className="text-sm text-red-500 mt-5">
            Please add at least one photo
          </p>
        )}
      </>
    );
  };

  const handleShowError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    const project = {
      project_name: projectName,
      description: projectDescription,
    };

    try {
      const res = await api.post("/api/showcase-projects/projects/", project);

      const photoRequests = [];
      // post request for photos
      for (let i = 0; i < photos.length; i++) {
        const photoData = new FormData();
        photoData.append("project", res.data.id);
        photoData.append("photo", photos[i].photo);
        photoData.append("caption", photos[i].caption);
        photoData.append("order", (i + 1).toString());


        const photoObj = {
          project: res.data.id,
          photo: photos[i].photo,
          caption: photos[i].caption,
          order: i + 1,
        };

        console.log(photoObj);
        photoRequests.push(
          api.post("/api/showcase-projects/photos/", photoObj)
        );
      }
      await Promise.all(photoRequests);

      // post request for tags
      await api.post(`/api/showcase-projects/tags/`, {
        project: res.data.id,
        tags: techStack,
      });
      navigate("/showcase");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <h3 className="text-md font-semibold text-primary">Project Name</h3>
            <Tooltip
              title="Naming your project"
              text="Please create a name that concisely summarizes/names your project. Simple is better!"
            />
          </div>
          <input
            type="text"
            placeholder="Enter project name"
            className="border border-border rounded-lg p-2 mt-2 w-full text-sm outline-none"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </div>
        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <h3 className="text-md font-semibold text-primary">Description</h3>
            <Tooltip
              title="Project Description"
              text="Please provide a detailed description of your project. This will help others understand your project better."
            />
          </div>
          <textarea
            placeholder="Enter project description"
            className="border border-border rounded-lg p-2 w-full  mt-2 h-20 min-h-10 max-h-28 text-sm outline-none"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
          />
        </div>

        <div className="mt-5">
          <div className="flex gap-2 items-center mb-2">
            <h3 className=" text-md font-semibold text-primary">Photos</h3>
            <Tooltip
              title="Photos"
              text="Optionally add photos with captions to showcase yuor project."
            />
          </div>
          {photos.length < 5 && (
            <div>
              <PictureInput addPhoto={addPhoto} />
            </div>
          )}
          {photos.length !== 0 && <div className="mt-2">{renderPhotos()}</div>}
        </div>

        <div className="mt-5 w-full">
          <div className="flex gap-5 items-center mb-2">
            <div className="flex gap-2 items-center">
              <h3 className=" text-md font-semibold text-primary">
                Tech Stack
              </h3>
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
            {techStack.map((tech, id) => (
              <Tag key={id} name={tech} />
            ))}
          </div>
        </div>

        {projectName.length > 3 &&
        projectDescription.length > 10 &&
        photos.length > 0 &&
        techStack.length > 0 ? (
          <button
            onClick={() => handleSubmit()}
            className="mt-7 bg-primary text-white rounded-lg py-2"
          >
            Showcase
          </button>
        ) : (
          <button
            onClick={handleShowError}
            className="mt-7 bg-primary text-white rounded-lg py-2 opacity-50"
          >
            Showcase
          </button>
        )}
        {showError && renderError()}
      </div>
    </div>
  );
};

export default ShowcaseForm;
