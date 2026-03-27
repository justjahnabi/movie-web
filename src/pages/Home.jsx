import React from 'react'
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SearchBar from "../components/SearchBar";
import GenreList from "../components/GenreList";
import MovieRow from "../components/MovieRow";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  const [topRated, setTopRated] = useState([]);
  const [recent, setRecent] = useState([]);

  const [genreMovies, setGenreMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("Comedy");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/movie/popular").then((res) => {
      setMovies(res.data.results);

      const shuffled = [...res.data.results].sort(() => 0.5 - Math.random());
      setHeroMovies(shuffled.slice(0, 5));
    });

    axios.get("/movie/top_rated").then((res) => {
      setTopRated(res.data.results);
    });

    axios.get("/movie/now_playing").then((res) => {
      setRecent(res.data.results);
    });
  }, []);

  useEffect(() => {
    if (!heroMovies.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroMovies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroMovies]);

  return (
    <div className="bg-white dark:bg-[#0b0f1a] text-black dark:text-white min-h-screen p-4">

      {heroMovies.length > 0 && (
        <div onClick={() => navigate(`/movie/${heroMovies[current].id}`)} className="relative h-[75vh] rounded-xl overflow-hidden mb-6 cursor-pointer group">
          <img src={`https://image.tmdb.org/t/p/original${heroMovies[current].backdrop_path}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-10 left-6">
            <h1 className="text-4xl font-bold"> {heroMovies[current].title} </h1>

            <p className="text-sm max-w-xl line-clamp-2"> {heroMovies[current].overview}</p>

            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 bg-gray-800/80 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm">⭐ {heroMovies[current].vote_average.toFixed(1)}</span>

              <button className="bg-red-800 flex items-center text-white px-4 py-2 rounded-md text-sm font-semibold ">Watch Now </button>
            </div>
          </div>

          <div className="absolute bottom-4 right-6 flex gap-2">{heroMovies.map((_, i) => (
            <div key={i} onMouseEnter={() => setCurrent(i)} className={`w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
          </div>
        </div>
      )}

      <SearchBar setMovies={setMovies} movies={movies} />

      <GenreList
        setMovies={setMovies}
        setGenreMovies={setGenreMovies}
        setActiveGenre={setActiveGenre}
        activeGenre={activeGenre}
      />

      {genreMovies.length > 0 && (
        <MovieRow title={`${activeGenre} Movies`} movies={genreMovies}/>
      )}

      <MovieRow title="Popular Movies" movies={movies} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Recently Added" movies={recent} />

    </div>
  );
};

export default Home;