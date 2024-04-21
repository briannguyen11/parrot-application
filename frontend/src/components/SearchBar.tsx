import SearchIcon from "../assets/icons/search-alt.svg";

const SearchBar = () => {
  return (
    <div className="flex border rounded-full lg:w-96 md:w-96  items-center">
      <img src={SearchIcon} alt="search" className="w-5 h-5 ml-3  " />
      <input
        type="text"
        placeholder="Search"
        className="text-sm font-light pl-5 lg:w-full p-[9px]  rounded-full focus:outline-none focus:outline-1"
      />
    </div>
  );
};

export default SearchBar;
