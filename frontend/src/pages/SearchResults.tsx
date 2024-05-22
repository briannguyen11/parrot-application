// This page shows the search results of the user's query
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api";

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    const fetchSearchResults = async () => {
     
      const response = await api.get(
        `/api/profiles/search?query=${searchQuery}`
      );
      console.log(response.data);
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="w-full">
      <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>
    </div>
  );
};

export default SearchResults;
