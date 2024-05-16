import Navbar from "@/components/navbar/Navbar";
import api from "@/api";
import { useEffect, useState } from "react";

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
const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");

  useEffect(() => {
    const fetchProjects = async (tab: string) => {
      try {
        const res = await api.get(`/api/open-projects/admin/?status=${tab}`);
        console.log(res.data);
        setProjects(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects(tab);
  }, [tab]);

  const approveProject = async (id: number) => {
    try {
      await api.patch(`/api/open-projects/projects/${id}/`, {
        status: "approved",
      });

      const newProjects = projects.filter((project) => project.id !== id);
      setProjects(newProjects);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectProject = async (id: number) => {
    try {
      await api.patch(`/api/open-projects/projects/${id}/`, {
        status: "rejected",
      });

      const newProjects = projects.filter((project) => project.id !== id);
      setProjects(newProjects);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="mt-16 w-full overflow-hidden flex flex-col items-center justify-center">
        <h1 className="mt-5 text-2xl font-semibold">Admin View</h1>

        <div className="mt-5 flex gap-4">
          <button
            onClick={() => setTab("pending")}
            className="border cursor-pointer rounded-lg p-2 hover:bg-gray-100"
          >
            View Pending {(tab === "pending" && `(${projects.length})`) || ""}
          </button>

          <button
            onClick={() => setTab("approved")}
            className="border cursor-pointer rounded-lg p-2 hover:bg-gray-100"
          >
            View Approved {(tab === "approved" && `(${projects.length})`) || ""}
          </button>

          <button
            onClick={() => setTab("rejected")}
            className="border cursor-pointer rounded-lg p-2 hover:bg-gray-100"
          >
            View Rejected {(tab === "rejected" && `(${projects.length})`) || ""}
          </button>
        </div>

        <div className="w-2/3">
          <div className="flex flex-col mt-5">
            {loading && <div>Loading...</div>}

            <div>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className=" border p-5 mt-5 overflow-scroll"
                >
                  <h1 className="text-xl font-semibold">
                    {project.project_name}
                  </h1>
                  <p className="text-sm mt-2">project id: {project.id}</p>
                  <p className="text-sm mt-2">{project.description}</p>
                  <p className="text-sm mt-2">Posted by: {project.user}</p>
                  <p className="text-sm mt-2">
                    Group Size: {project.group_size}
                  </p>
                  <p className="text-sm mt-2">Status: {project.status}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => approveProject(project.id)}
                      className="border p-2 mt-2 hover:bg-gray-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectProject(project.id)}
                      className="border p-2 mt-2 hover:bg-gray-300"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
