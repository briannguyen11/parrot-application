import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";

const CreateDropdown = () => {
  const navigate = useNavigate();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <h2 className="font-semibold font-raleway text-sm hover:cursor-pointer hover:text-primary-foreground whitespace-nowrap">
              Create Project
            </h2>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="whitespace-nowrap py-2 font-raleway text-sm font-medium">
              <NavigationMenuLink>
                <div
                  onClick={() => navigate("/create")}
                  className="p-3 px-5 hover:bg-gray-100 cursor-pointer"
                >
                  Create Showcase
                </div>
              </NavigationMenuLink>

              <NavigationMenuLink>
                <div
                  onClick={() => navigate("/create")}
                  className="p-3 px-5 hover:bg-gray-100 cursor-pointer"
                >
                  Create Open Project
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CreateDropdown;
