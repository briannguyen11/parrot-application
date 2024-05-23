// This page shows the search results of the user's query
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api";
import BlankAvatar from "../assets/icons/person.svg";


interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  profile_picture: string;
}


const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [profiles, setProfiles] = useState([] as Profile[]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      console.log(`/api/profiles/search/?query=${searchQuery}`);

      const response = await api.get(
        `/api/profiles/search/?query=${searchQuery}`
      );
      console.log(response.data);
      setProfiles(response.data);
    };

    searchQuery && fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="w-full pt-5 lg:pl-5">
      <h1 className="mb-5 text-xl font-medium">Search results for '{searchQuery}'</h1>
    

      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-medium">People</h2>

        <div className="mt-5 flex flex-col gap-8">
          {profiles.map((result) => (
            <div key={result.id} className="flex items-center gap-4">
              <img
                src={result.profile_picture || BlankAvatar}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {result.first_name + " " + result.last_name}
                </h3>

                <p>{result.bio}</p>
              </div>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
