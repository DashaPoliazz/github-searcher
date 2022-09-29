import {
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

import { Navigation } from "../components/Navigation";

import {
  useLazyGetUsersRepositoryQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

import { useDebounce } from "../hooks/useDebounce";
import { RepositoryCard } from "../components/RepositoryCard";

const LOCALSTORAGE_SEARCHQUERY_KEY = "LOCALSTORAGE_SEARCHQUERY_KEY";

export const HomePage = () => {
  // Local state
  const [query, setQuery] = useState(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_SEARCHQUERY_KEY) ?? "")
  );
  const [isDropwdown, setIsDropdown] = useState(false);

  // Custom hooks
  const debouncedQuery = useDebounce(query, 1000);

  // RTK hooks
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
    refetchOnFocus: true,
  });
  const [
    fetchRepos,
    { isLoading: isReposLoading, isError: isReposError, data: repos },
  ] = useLazyGetUsersRepositoryQuery();

  useEffect(() => {
    setIsDropdown(debouncedQuery.length > 3 && !!users?.length);
  }, [isLoading]);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_SEARCHQUERY_KEY, JSON.stringify(query));
  }, [query]);

  // Click Handlers
  const onClickHandler = (username: string) => {
    fetchRepos(username);
    setIsDropdown(false);
  };

  return (
    <div className="flex justify-center pt-10 h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong</p>
      )}

      <div className="relative w-[560px]">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username"
        />

        {isDropwdown && (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              users?.map((user) => (
                <li
                  key={user.id}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    onClickHandler(user.login);
                  }}
                >
                  {user.login}
                </li>
              ))
            )}
          </ul>
        )}

        <div className="container">
          {isReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}

          {repos?.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};
