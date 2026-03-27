import React from 'react'
import { useNavigate } from "react-router-dom";

const MovieRow = ({ title, movies }) => {
  const navigate = useNavigate();
  const renderStars = (rating) => {
    const fullStars = Math.round(rating / 2);
    const emptyStars = 5 - fullStars;

    return (
      <span className="flex items-center gap-1 text-sm">
        <span className="text-red-500 text-lg">{"★".repeat(fullStars)}</span>
        <span className="text-gray-300 text-lg">{"★".repeat(emptyStars)}</span>
        <span className="text-white ml-1">({rating.toFixed(1)})</span>
      </span>
    );
  };

  const formatCategory = (title) => {
    const t = title.toLowerCase();

    if (t.includes("top")) return "top_rated";
    if (t.includes("popular")) return "popular";
    if (t.includes("recent")) return "now_playing";
    return t.replace(" movies", "");
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={() =>
          navigate(`/view-all/${formatCategory(title)}`)
        } className="text-Sm hover:active:scale-95"> View All {" >"}</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">{movies.slice(0, 6).map((movie) => (
        <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)} className="relative min-w-45 cursor-pointer hover:scale-105 transition duration-300">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="rounded-lg" />

          <div className="absolute bottom-2 left-2"> {renderStars(movie.vote_average)} </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default MovieRow;