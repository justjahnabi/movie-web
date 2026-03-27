import { useEffect } from "react";
import axios from "../api/axios";

const genres = [
  { id: 35, name: "Comedy" },
  { id: 28, name: "Action" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 18, name: "Drama" },
];

const GenreList = ({ setGenreMovies, setActiveGenre, activeGenre }) => {
  const fetchMoviesByGenre = (id, name) => {
    axios.get("/discover/movie", { params: { with_genres: id, }, }).then((res) => {
      setGenreMovies(res.data.results);
      setActiveGenre(name);
    });
  };

  useEffect(() => {
    fetchMoviesByGenre(35, "Comedy");
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Movie Genres</h2>

      <div className="flex gap-2 flex-wrap">
        {genres.map((genre) => (
          <button
            key={genre.id} onClick={() => fetchMoviesByGenre(genre.id, genre.name)} className={`px-4 py-2 rounded-md ${activeGenre === genre.name ? "bg-red-800 text-white" : "bg-gray-700 text-white"}`}>{genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreList;