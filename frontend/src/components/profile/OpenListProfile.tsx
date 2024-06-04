import { OpenData } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface OpenProjectProp {
  openProjects: OpenData[];
  loading?: boolean;
}

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

const OpenListProfile: React.FC<OpenProjectProp> = ({
  openProjects,
  loading,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-4 font-montserrat">
      {openProjects?.map((project) => (
        <div
          onClick={() => navigate(`/open-project/${project.id}`)}
          key={project.id}
          className={`border-2 p-3 rounded-xl border-parrot-green ${
            project.status === "pending_approval" && "border-parrot-yellow"
          } ${
            project.status === "rejected" && "border-parrot-red"
          } py-5 cursor-pointer`}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-base text-primary max-w-72 overflow-scroll">
                {project.project_name}
              </h2>
              <p className="text-secondary text-xs">{project.status}</p>
            </div>

            <p className="text-secondary text-xs md:flex hidden">
              {formatDate(project.post_date)}
            </p>
          </div>

          <p className="text-sm mt-3 text-primary-foreground break-words">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OpenListProfile;
