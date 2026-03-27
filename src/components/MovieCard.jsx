import React from 'react'
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const fullStars = Math.round(rating / 2);
    const emptyStars = 5 - fullStars;

    return (
      <span className="flex items-center gap-0.75 text-sm">
        <span className="text-red-500 text-lg">{"★".repeat(fullStars)}</span>
        <span className="text-gray-300 text-lg">{"★".repeat(emptyStars)}</span>
        <span className="text-white ml-1">({rating.toFixed(1)})</span>
      </span>
    );
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)} className="relative cursor-pointer hover:scale-105 transition duration-300">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="rounded-lg" />
      <div className="absolute bottom-2 left-2">{renderStars(movie.vote_average)}</div>
    </div>
  );
};

export default MovieCard;