import SearchIcon from "../../assets/icons/search-alt.svg";

const SearchBar = () => {
  return (
    <div className="border border-gray-300 rounded-2xl lg:w-96 w-96 items-center md:flex hidden">
      <img src={SearchIcon} alt="search" className="w-5 h-5 ml-3  " />
      <input
        type="text"
        placeholder="Search"
        className="text-sm font-light pl-5 lg:w-full p-[9px] bg-inherit rounded-full focus:outline-none focus:outline-1"
      />
    </div>
  );
};

export default SearchBar;
