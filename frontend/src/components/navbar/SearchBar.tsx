import SearchIcon from "../../assets/icons/search-alt.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {

  const navigate = useNavigate(); 
  const [search, setSearch] = useState("");

  return (
    <div className="border border-gray-300 rounded-2xl lg:w-96 w-96 items-center md:flex hidden">
      <img src={SearchIcon} alt="search" className="w-5 h-5 ml-3  " />
      <input
        type="text"
        placeholder="Search"
        className="text-sm font-light pl-5 lg:w-full p-[9px] bg-inherit rounded-full focus:outline-none focus:outline-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && search.length > 0) {
            navigate(`/search?query=${search}`);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
