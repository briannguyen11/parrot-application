import api from "@/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "@/components/project/TeamCard";
import { ApplicantAccordion } from "@/components/project/ApplicantAccordion";
import { EditModal } from "@/components/project/EditModal";

interface Project {
  id: number;
  project_name: string;
  description: string;
  level: string;
  post_date: string;
  group_size: number;
  user: string;
  tags?: string[];
  open: boolean;
  status: string;
}

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [isOwner, setIsOwner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get(
          "/api/open-projects/projects/" + projectId + "/"
        );

        const tags = await api.get(
          "/api/open-projects/tags/?project_id=" + projectId
        );

        res.data.tags = tags.data.map((tag: { tag: string }) => tag.tag);
        console.log(res.data);
        setProject(res.data);
        document.title = `${res.data.project_name} | Parrot`;
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderDashboard = () => {
    return (
      <div className="lg:inline-block hidden border-l min-h-home overflow-y-auto pl-5 pt-11">
        <h1 className="text-xl font-semibold text-primary">
          Project Dashboard
        </h1>

        <h2 className=" mt-5 mb-1 font-medium text-primary">Team Structure</h2>
        <div className="flex flex-col gap-2">
          <TeamCard name={"Me"} />

          {Array.from(
            { length: project ? project?.group_size - 1 : 0 },
            (_, index) => (
              <TeamCard key={index} />
            )
          )}
        </div>

        <ApplicantAccordion />
      </div>
    );
  };

  return (
    <div className="w-full h-home">
      <div
        className={`grid ${
          isOwner && "lg:grid-cols-[auto_19rem] 2xl:grid-cols-[auto_25rem]"
        }`}
      >
        <div className="h-home w-full overflow-y-auto p-5 lg:pl-9">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-secondary-foreground underline"
          >
            {"<- Back"}
          </button>
          <div className="mt-2 flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-primary">
              {project?.project_name}
            </h1>

            <EditModal />
            <button
              onClick={() => setIsOwner(!isOwner)}
              className="border p-1 px-4 rounded-lg text-sm hover:bg-card-red hover:text-white"
            >
              Toggle isOwner
            </button>
          </div>
          <p className="text-secondary-foreground text-sm mt-1">
            {project?.post_date}
          </p>

          <h3 className="mt-5  text-primary font-medium">Description</h3>
          <p className="mt-1 text-secondary font-light break-words">
            {project?.description}
          </p>

          <h3 className="mt-5  text-primary font-medium">Difficulty</h3>
          <p className="mt-1 text-secondary font-light break-words">
            {project?.level}
          </p>

          <h3 className="mt-5  text-primary font-medium">Technologies Used</h3>
          <p className="mt-1 text-secondary font-light break-words">
            {project?.tags?.join(", ")}
          </p>

          <h3 className="mt-10  text-primary font-medium">Interest Form</h3>
          <h4 className="mt-1 text-secondary text-sm font-light">
            1. What is your name?
          </h4>
          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full p-2"
          />

          <h4 className="mt-5 text-secondary font-light text-sm">
            2. What is your email?
          </h4>
          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full p-2"
          />

          <button className="mt-5 bg-primary text-white text-sm p-2 rounded-lg">
            Submit Interest
          </button>
        </div>

        {isOwner && renderDashboard()}
      </div>
    </div>
  );
};

export default Project;
