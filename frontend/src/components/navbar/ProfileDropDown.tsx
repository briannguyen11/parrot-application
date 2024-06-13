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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { UserAuth } from "../../auth/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { Skeleton } from "../ui/skeleton";

export function ProfileDropDown() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, setUser, loading } = UserAuth();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    signOut(auth);
    navigate("/");
  };

  const renderPfp = () => {
    if (user && user.profile_picture) {
      return user.profile_picture;
    } else {
      return ProfilePicture;
    }
  };

  if (loading) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <Toaster />
      <DropdownMenuTrigger asChild>
        <img src={renderPfp()} alt="profile" className="h-9 w-9 rounded-full" />
      </DropdownMenuTrigger>
      {user !== null ? (
        <DropdownMenuContent className="md:mr-12 mr-5 mt-[14px] w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => {
                if (user !== undefined) {
                  navigate(`/${user.username}`);
                } else {
                  navigate("/onboard");
                }
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => {
                if (user !== undefined) {
                  navigate("/messages");
                } else {
                  navigate("/onboard");
                }
              }}
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
              handleLogout();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
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
