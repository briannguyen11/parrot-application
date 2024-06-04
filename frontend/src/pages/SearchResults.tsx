// This page shows the search results of the user's query
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api";
import BlankAvatar from "../assets/icons/person.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";


interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  profile_picture: string;
}

const renderSkeleton = () => {
  return (
    <>
      <div className="mt-5 flex flex-col ">
        <div className="flex items-start gap-4 border-b py-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-40" />

            <Skeleton className="mt-3 h-4 w-60" />
          </div>
        </div>

        <div className="flex items-start gap-4 border-b py-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-40" />

            <Skeleton className="mt-3 h-4 w-60" />
          </div>
        </div>

        <div className="flex items-start gap-4 border-b py-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-40" />

            <Skeleton className="mt-3 h-4 w-60" />
          </div>
        </div>

        <div className="flex items-start gap-4 py-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-40" />

            <Skeleton className="mt-3 h-4 w-60" />
          </div>
        </div>
      </div>
    </>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [profiles, setProfiles] = useState([] as Profile[]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {

    setLoading(true);
    const fetchSearchResults = async () => {
      console.log(`/api/profiles/search/?query=${searchQuery}`);

      const response = await api.get(
        `/api/profiles/search/?query=${searchQuery}`
      );
      console.log(response.data);
      setProfiles(response.data);
      setLoading(false);
    };

    searchQuery && fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="w-full pt-5 lg:pl-5">
      <h1 className="mb-5 text-xl font-medium">
        Search results for '{searchQuery}'
      </h1>

      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-medium text-primary">People</h2>
        {loading && renderSkeleton()}
        {!loading && (
          <div className="mt-5 flex flex-col ">
            {profiles.map((result, index) => (
              <div
              onClick={() => navigate(`/${result.id}`)}
                key={result.id}
                className={`flex items-start gap-4 border-b py-5 cursor-pointer ${
                  index === profiles.length - 1 ? "border-b-0" : ""
                }`}
              >
                <img
                  src={result.profile_picture || BlankAvatar}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-md font-medium">
                    {result.first_name + " " + result.last_name}
                  </h3>

                  <p className="text-sm text-secondary">{result.bio}</p>
                </div>
              </div>
            ))}

            {profiles.length === 0 && (
              <p className="text-md text-secondary">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
