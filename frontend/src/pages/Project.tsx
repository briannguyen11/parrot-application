import api from "@/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get(
          "/api/open-projects/projects/" + projectId + "/"
        );
        console.log(res.data);
        setProject(res.data);
        setLoading(false);
        console.log(project);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchProjects();
  }, [project, projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-home">
      
      <div className="grid lg:grid-cols-5 w-full h-full">
        <div className="col-span-4 h-full border-r">
          <h1 className="text-2xl font-semibold text-primary">
            {project?.project_name}
          </h1>
          <p className="mt-2 text-secondary font-light">
            {project?.description}
          </p>
        </div>

        <div>Hello</div>
      </div>
    </div>
  );
};

export default Project;
