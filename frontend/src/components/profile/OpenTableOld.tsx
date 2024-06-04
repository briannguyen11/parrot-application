import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/api";
import { useState } from "react";
import { OpenData } from "../interfaces";

interface OpenProjectProp {
  openProjects: OpenData[];
  setOpenProjects: React.Dispatch<React.SetStateAction<OpenData[]>>;
  formatDate: (dateString: string) => string;
}

const OpenTable: React.FC<OpenProjectProp> = ({
  openProjects,
  setOpenProjects,
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

  const renderStatus = (status: string) => {
    if (status === "pending_approval") {
      return <div className="text-yellow-400">Pending</div>;
    } else if (status === "approved") {
      return <div className="text-green-400">Approved</div>;
    } else {
      return status;
    }
  };

  const handleDelete = async () => {
    console.log(deletedIds);
    try {
      const res = await api.post("/api/open-projects/projects/delete-many/", {
        ids: deletedIds,
      });
      if (res.status === 204) {
        setOpenProjects((prevOpen) =>
          prevOpen.filter((open) => !deletedIds.includes(open.id))
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
          <h3 className="text-xl font-bold">Open Projects</h3>
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
              <TableHead className="text-left w-1/2">Name</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {openProjects?.map((project: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={deletedIds.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {project.project_name}
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(project.post_date)}
                </TableCell>
                <TableCell className="flex justify-end h-full">
                  {renderStatus(project.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OpenTable;
