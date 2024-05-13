import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ShowcaseProjectsTable = () => {
  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex flex-col justify-left gap-1">
        <h3 className="text-xl font-bold text-center">
          Your Showcase Projects
        </h3>
        <Table>
          <TableCaption>A list of your showcase projects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-2/3">Name</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ShowcaseProjectsTable;
