import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h2>Github search</h2>

      <span>
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/favourite">Favourites</Link>
      </span>
    </nav>
  );
};
