import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserOpenProjectsProps = {
  userOpenProjects: any[];
};

const OpenProjectsTable: React.FC<UserOpenProjectsProps> = ({
  userOpenProjects,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    return `${month}/${day}/${year}`;
  };

  const renderStatus = (status: string) => {
    if (status === "pending_approval") {
      return <div className="w-3 h-3 rounded-full bg-yellow-400"></div>;
    } else if (status === "approved") {
      return <div className="w-3 h-3 rounded-full bg-green-400"></div>;
    } else {
      return status;
    }
  };

  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex flex-col justify-left gap-1">
        <h3 className="text-xl font-bold text-center">Open Projects</h3>
        <Table>
          <TableCaption>A list of your open projects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-1/2">Name</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOpenProjects.map((project: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {project.project_name}
                </TableCell>
                <TableCell className="flex justify-end items-center h-full">
                  {renderStatus(project.status)}
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(project.post_date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OpenProjectsTable;
