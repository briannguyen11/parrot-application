import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import api from "@/api";

import { ShowcaseData } from "../interfaces";

interface ShowcaseProjectProp {
  showcaseProjects: ShowcaseData[];
  setShowcaseProjects: React.Dispatch<React.SetStateAction<ShowcaseData[]>>;
  formatDate: (dateString: string) => string;
}

const ShowcaseTable: React.FC<ShowcaseProjectProp> = ({
  showcaseProjects,
  setShowcaseProjects,
  formatDate,
}) => {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  const handleCheckboxChange = (projectId: number) => {
    setDeletedIds((prevSelected) => {
      // Remove the project if already selected, otherwise add
      if (prevSelected.includes(projectId)) {
        return prevSelected.filter((id) => id !== projectId);
      } else {
        return [...prevSelected, projectId];
      }
    });
  };

  const handleDelete = async () => {
    console.log(deletedIds);
    try {
      const res = await api.post(
        "/api/showcase-projects/projects/delete-many/",
        {
          ids: deletedIds,
        }
      );
      if (res.status === 204) {
        setShowcaseProjects((prevShowcase) =>
          prevShowcase.filter((showcase) => !deletedIds.includes(showcase.id))
        );
        setDeletedIds([]);
      }
    } catch (error: any) {
      console.error(error.response);
    }
  };

  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex flex-col justify-left gap-1">
        <div className="flex flex-inline justify-between items-center">
          <h3 className="text-xl font-bold">Showcase Projects</h3>
          {deletedIds.length > 0 && (
            <button
              className="py-1 px-2 bg-red-500 text-white text-sm rounded-md"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          )}
        </div>
        <Table className="min-w-[576px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-1/8"></TableHead>
              <TableHead className="text-left w-4/8">Project</TableHead>
              <TableHead className="text-right w-1/8">Date</TableHead>
              <TableHead className="text-right w-1/8">Likes</TableHead>
              <TableHead className="text-right w-1/8">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showcaseProjects.map((project: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={deletedIds.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-inline gap-2">
                    <img
                      src={project.photos[0].photo}
                      alt="cover"
                      className="w-28"
                    />
                    <div className="flex-col">
                      <h5 className="text-md font-semibold">
                        {project.project_name}
                      </h5>
                      <p className="text-slate-500 truncate max-w-[200px]">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right align-top">
                  {formatDate(project.post_date)}
                </TableCell>
                <TableCell className="text-right align-top">
                  {project.likes ? project.likes.length : 0}
                </TableCell>
                <TableCell className="text-right align-top">
                  {project.comments ? project.comments.length : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ShowcaseTable;
