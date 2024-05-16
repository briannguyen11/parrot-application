import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Spritesheet from "../../assets/icons/spritesheet.svg";

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <svg
          className="w-8 h-8 object-cover hover:cursor-pointer hover:bg-gray-200 p-1 rounded-full transition duration-300 ease-in-out fill-primary"
          viewBox="0 0 24 24"
        >
          <use href={Spritesheet + "#notification"} />
        </svg>
      </PopoverTrigger>
      <PopoverContent className="md:mr-20 mr-16 mt-3">
        You have 0 new notifications. Try joining a project!
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
