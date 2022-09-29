import { useActions } from "../hooks/useActions";
import { IRepository } from "../models/models";

export const RepositoryCard = ({ repository }: { repository: IRepository }) => {
  const { full_name, forks, watchers, description, html_url } = repository;
  const { addToFavourites, removeFromFavourites } = useActions();

  const addToFavourite = (
    e: React.MouseEvent<HTMLButtonElement>,
    repositoryUrl: string
  ) => {
    e.preventDefault();

    addToFavourites(repositoryUrl);
  };

  return (
    <a href={html_url} target="_blank">
      <div className="border py-4 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
        <h2 className="text-lg font-bold">{full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{forks}</span>
          Watchers: <span className="font-bold">{watchers}</span>
        </p>
        <p className="text-sm font-thin">{description}</p>
        <button
          onClick={(e) => addToFavourite(e, html_url)}
          className="p-2 border-none text-cyan-600 bg-slate-400 shadow-sm hover:text-cyan-900 transition-all"
        >
          Add to favourites
        </button>
      </div>
    </a>
  );
};
