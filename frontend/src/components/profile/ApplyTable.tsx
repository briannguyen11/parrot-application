import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ApplyData } from "../interfaces";

interface ApplyProjectProps {
  applyProjects: ApplyData[];
}

const ApplyTable: React.FC<ApplyProjectProps> = ({ applyProjects }) => {
  const renderStatus = (status: string) => {
    if (status === "applied") {
      return <div className="text-yellow-400">Applied</div>;
    } else if (status === "revoked") {
      return <div className="text-orange-400">Revoked</div>;
    } else {
      return status;
    }
  };

  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex flex-col justify-left gap-1">
        <h3 className="text-xl font-bold">Applied To Projects</h3>

        <Table className="min-w-[576px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-1/2">Name</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applyProjects.map((project: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {project.project.project_name}
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

export default ApplyTable;
