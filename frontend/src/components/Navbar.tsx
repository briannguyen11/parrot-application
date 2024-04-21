import { DropdownMenuDemo } from "./DropdownMenuDemo";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white md:px-10 px-5 py-3 flex border-b border-gray-200 z-50 justify-between">
      <div className="flex justify-center items-center gap-5">
        <img
          src="../../public/icon.png"
          alt="logo"
          className="w-5 h-10 object-cover"
        />
        <h1 className="text-[23px] font-medium">SPRINT</h1>
      </div>
    <div className="flex items-center">
    <DropdownMenuDemo />
    </div>
     
    </div>
  );
};

export default Navbar;
