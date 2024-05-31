import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";

import { useState } from "react";

export interface CommunityPopoverProps {
  handleFilter: (filter: string[]) => void;
}

export function CommunityPopover({ handleFilter }: CommunityPopoverProps) {
  const [communities, setCommunities] = useState<string[]>([]);

  const handleBlock = () => {
    handleFilter(communities);

    setCommunities([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-block mt-3 border border-secondary-foreground  hover:cursor-pointer rounded-lg items-center gap-2 p-2">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-primary font-montserrat">
              Community
            </p>
            <ChevronDown size={18} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[350px] bg-white overflow-scroll">
        <DialogHeader>
          <DialogTitle>Select Communities</DialogTitle>
          <DialogDescription>
            Search for projects that match your interests.
          </DialogDescription>

          <div className="pt-5 grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                if (communities.includes("All")) {
                  setCommunities(communities.filter((c) => c !== "All"));
                } else {
                  setCommunities([...communities, "All"]);
                }
              }}
              className="rounded-lg p-2 w-full bg-parrot-red text-sm text-white"
            >
              All {communities.includes("All") ? "✓" : ""}
            </button>

            <button
              onClick={() => {
                if (communities.includes("Computer Science")) {
                  setCommunities(
                    communities.filter((c) => c !== "Computer Science")
                  );
                } else {
                  setCommunities([...communities, "Computer Science"]);
                }
              }}
              className="rounded-lg p-2 w-full bg-parrot-blue text-sm text-white"
            >
              Computer Science{" "}
              {communities.includes("Computer Science") ? "✓" : ""}
            </button>

            <button
              onClick={() => {
                if (communities.includes("Electrical Engineering")) {
                  setCommunities(
                    communities.filter((c) => c !== "Electrical Engineering")
                  );
                } else {
                  setCommunities([...communities, "Electrical Engineering"]);
                }
              }}
              className="rounded-lg p-2 w-full bg-parrot-green text-sm text-white"
            >
              Electrical Engineering{" "}
              {communities.includes("Electrical Engineering") ? "✓" : ""}
            </button>

            <button
              onClick={() => {
                if (communities.includes("Design")) {
                  setCommunities(communities.filter((c) => c !== "Design"));
                } else {
                  setCommunities([...communities, "Design"]);
                }
              }}
              className="rounded-lg p-2 w-full bg-parrot-yellow text-sm text-white"
            >
              Design {communities.includes("Design") ? "✓" : ""}
            </button>

            <button
              onClick={() => {
                if (communities.includes("Photography")) {
                  setCommunities(
                    communities.filter((c) => c !== "Photography")
                  );
                } else {
                  setCommunities([...communities, "Photography"]);
                }
              }}
              className="rounded-lg p-2 w-full bg-parrot-purple text-sm text-white"
            >
              Photography {communities.includes("Photography") ? "✓" : ""}
            </button>
          </div>
        </DialogHeader>

        <DialogFooter>
          <DialogTrigger className="inline-block" asChild>
            <button
              onClick={() => handleBlock()}
              className=" font-semibold bg-border hover:bg-gray-300 border border-border text-sm text-primary font-raleway rounded-lg inline-block h-10 p-2 transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
