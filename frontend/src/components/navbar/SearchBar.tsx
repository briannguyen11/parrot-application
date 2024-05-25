import SearchIcon from "../../assets/icons/search-alt.svg";

import { useState } from "react";


type SearchBarProps = {
  handleNavigate: (path: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ handleNavigate }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-200 rounded-2xl w-96 lg:w-64 items-center md:flex hidden">
      <img src={SearchIcon} alt="search" className="w-5 h-5 ml-3  " />
      <input
        type="text"
        placeholder="Search"
        className="text-sm font-light pl-5 lg:w-full p-2 bg-inherit rounded-full focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && search.length > 0) {
            handleNavigate(`/search?query=${search}`);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
