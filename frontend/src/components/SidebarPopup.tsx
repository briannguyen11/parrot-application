import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SidebarPopup() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <svg
          className="lg:hidden"
          fill="currentColor"
          height="20"
          icon-name="menu-outline"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 10.625H1v-1.25h18v1.25Zm0-7.875H1V4h18V2.75ZM19 16H1v1.25h18V16Z"></path>
        </svg>
      </SheetTrigger>
      <SheetContent className="w-72 mt-16" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
