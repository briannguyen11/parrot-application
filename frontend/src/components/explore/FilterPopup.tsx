import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import FilterIcon from "@/assets/icons/filter.svg";
import { useState } from "react";
import TechStackInput from "../TechStackInput";
import Tag from "./Tag";

export function FilterPopup({
  handleFilter,
}: {
  handleFilter: (filter: { level: string; groupSize: number }) => void;
}) {
  const [difficulty, setDifficulty] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [groupSize, setGroupSize] = useState<number>(0);

  const addTechStack = (tech: string) => {
    if (techStack.includes(tech)) {
      return;
    }
    setTechStack([...techStack, tech]);
  };

  const clearTechStack = () => {
    setTechStack([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:cursor-pointer hover:bg-gray-100 flex rounded-lg items-center gap-2 w-20 p-2">
          <img src={FilterIcon} alt="filter" className="w-5 h-5" />
          <p className="text-sm text-primary">Filter</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[400px] bg-white overflow-scroll">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Search for projects that match your interests.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-10 justify-start">
          <div className="flex items-center gap-4">
            <Label htmlFor="experience" className="text-right">
              Experience:
            </Label>
            <div className="flex justify-between gap-3">
              <div
                onClick={() => setDifficulty("beginner")}
                className={`border p-2 rounded-lg cursor-pointer ${
                  difficulty === "beginner" && "bg-gray-100"
                }`}
              >
                Beginner
              </div>
              <div
                onClick={() => setDifficulty("intermediate")}
                className={`border p-2 rounded-lg cursor-pointer ${
                  difficulty === "intermediate" && "bg-gray-100"
                }`}
              >
                Intermediate
              </div>
              <div
                onClick={() => setDifficulty("advanced")}
                className={`border p-2 rounded-lg cursor-pointer ${
                  difficulty === "advanced" && "bg-gray-100"
                }`}
              >
                Advanced
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="Group Size" className="text-right">
              Group Size:
            </Label>

            <input
              type="number"
              id="groupSize"
              name="groupSize"
              className="border p-2 rounded-lg"
              placeholder="Enter group size"
              onChange={(e) => setGroupSize(parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="technologies" className="text-right">
              Technologies:
            </Label>
            <button
              onClick={clearTechStack}
              className="text-sm text-gray-400 underline "
            >
              Clear
            </button>
          </div>

          <TechStackInput addTechStack={addTechStack} />

          <div className="mt-5 flex gap-x-3 gap-y-3 flex-wrap h-10">
            {techStack.map((tech, id) => (
              <Tag key={id} name={tech} />
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                handleFilter({
                  level: difficulty,
                  groupSize: groupSize,
                });

                setDifficulty("");
                setGroupSize(0);
                clearTechStack();
              }}
              className="border h-12 p-2 rounded-xl"
              aria-label="Close"
            >
              Save Changes
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
