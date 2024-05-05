import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TechStackInputProps {
  addTechStack: (tech: string) => void;
}

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "Python",
    label: "Python",
  },
  {
    value: "Javascript",
    label: "Javascript",
  },
  {
    value: "Java",
    label: "Java",
  },

  {
    value: "React",
    label: "React",
  },

  {
    value: "Django",
    label: "Django",
  },

  {
    value: "Node.js",
    label: "Node.js",
  },
];

const TechStackInput: React.FC<TechStackInputProps> = ({ addTechStack }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          Select Framework
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StatusList setOpen={setOpen} addTechStack={addTechStack} />
      </PopoverContent>
    </Popover>
  );
};

function StatusList({
  setOpen,
  addTechStack,
}: {
  setOpen: (open: boolean) => void;
  addTechStack: (tech: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                console.log(value);
                addTechStack(value);
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default TechStackInput;
