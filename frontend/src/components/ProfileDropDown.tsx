import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import ProfilePicture from "../assets/icons/noauth-avatar.svg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

export function ProfileDropDown() {
  const navigate = useNavigate();

  // hardcode for now, change when using auth wrapper
  const auth = true;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={ProfilePicture}
          alt="profile"
          className="h-8 w-8 rounded-full border-[1.5px] border-gray-800 p-1"
        />
      </DropdownMenuTrigger>

      {auth ? (
        <DropdownMenuContent className="lg:mr-10 mr-5 mt-3 w-56 ">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Log In</span>
              
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem className="hover:cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              <span>New Project</span>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="hover:cursor-pointer">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="lg:mr-10 mr-5 mt-3 w-56 ">
          <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Log In</span>
              
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Sign Up</span>
            
            </DropdownMenuItem>


        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
