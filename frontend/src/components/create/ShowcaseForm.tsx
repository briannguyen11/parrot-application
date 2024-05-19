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

const ShowcaseProjectForm = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

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
      <div
        key={index}
        className="flex flex-inline gap-4 items-center mt-2 relative"
      >
        <button
          className="absolute top-0 left-0 opacity-0 hover:opacity-100 bg-red-500 text-white w-28 h-28 rounded-lg"
          onClick={() => deletePhoto(index)}
        >
          delete
        </button>
        <img
          src={URL.createObjectURL(photo.photo)}
          alt={"photo" + index}
          className="w-28 h-28 rounded-lg"
        />
        <div className="flex flex-col">
          <p className="text-slate-400">Caption for photo {index + 1}:</p>
          <p>{photo.caption}</p>
        </div>
      </div>
    ));
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
        photoRequests.push(
          api.post("/api/showcase-projects/photos/", photoData)
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
      console.error(error.response);
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
        <button
          className="w-full bg-black text-white rounded-lg py-2 px-1"
          onClick={() => handleSubmit()}
        >
          Showcase
        </button>
      </div>
    </div>
  );
};

export default ShowcaseProjectForm;
