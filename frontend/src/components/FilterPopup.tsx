import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FilterIcon from "@/assets/icons/filter.svg";

export function FilterPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:cursor-pointer hover:bg-gray-100 flex rounded-lg items-center gap-2 w-20 p-2">
          <img src={FilterIcon} alt="filter" className="w-5 h-5" />
          <p className="text-sm text-secondary">Filter</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[400px]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Search for projects that match your interests.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="experience" className="text-right">
              Experience
            </Label>
            <Input id="name" defaultValue="Beginner" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="technologies" className="text-right">
              Technologies
            </Label>
            <Input
              id="technologies"
              defaultValue="Python, Javascript"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <button className="IconButton" aria-label="Close">
              <Button type="submit">Save changes</Button>
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
