import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationIcon from "../assets/icons/notification.svg";

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={NotificationIcon}
          alt="notification"
          className="w-8 h-8 object-cover hover:cursor-pointer hover:bg-gray-200 p-1 rounded-full transition duration-300 ease-in-out"
          draggable="false"
        />
      </PopoverTrigger>
      <PopoverContent className="md:mr-20 mr-16 mt-3">You have 0 new notifications. Try joining a project!</PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
