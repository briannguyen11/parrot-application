import {
  LifeBuoy,
  LogIn,
  LogOut,
  MessageSquare,
  Settings,
  UserPlus,
  User,
} from "lucide-react";

import ProfilePicture from "../../assets/icons/noauth-avatar.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "../../auth/AuthWrapper";

export function ProfileDropDown() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedInPfp, loggedOut, setUserPfp } = useAuth();

  const auth = isLoggedIn;

  const handleLogout = () => {
    localStorage.clear();
    setUserPfp(null);
    loggedOut();
    navigate("/");
  };

  const renderPfp = () => {
    if (loggedInPfp) {
      return loggedInPfp;
    } else {
      return ProfilePicture;
    }
  };

  return (
    <DropdownMenu>
      <Toaster />
      <DropdownMenuTrigger asChild>
        <img src={renderPfp()} alt="profile" className="h-9 w-9 rounded-full" />
      </DropdownMenuTrigger>

      {auth ? (
        <DropdownMenuContent className="md:mr-12 mr-5 mt-[14px] w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/messages")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Message</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer">
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => {
              toast("You have been logged out.", {
                description: "See you again!",
                action: {
                  label: "Close",
                  onClick: () => console.log(""),
                },
                className: "bg-white",
              });
              handleLogout();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="lg:mr-10 mr-5 mt-3 w-56 ">
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Sign Up</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
