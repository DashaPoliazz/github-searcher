import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";

export const FavouritePage = () => {
  const { savedRepositories } = useAppSelector((state) => state.github);
  const { removeFromFavourites } = useActions();

  const deleteFromFavourites = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: string
  ) => {
    e.preventDefault();

    removeFromFavourites(link);
  };

  return (
    <div className="flex justify-center pt-10 h-screen w-screen">
      {savedRepositories.length > 0 ? (
        <ul>
          {savedRepositories.map((repo) => (
            <li
              key={repo}
              className="flex flex-col text-center border-4 my-10 p-5"
            >
              <a
                href={repo}
                target="_blank"
                className="my-3 hover:text-blue-400"
              >
                {repo}
              </a>
              <button
                onClick={(e) => deleteFromFavourites(e, repo)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Delete from favourites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing...</p>
      )}
    </div>
  );
};
