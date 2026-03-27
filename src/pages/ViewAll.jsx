import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import MovieCard from "../components/MovieCard";

const genreMap = {
  comedy: 35,
  action: 28,
  horror: 27,
  romance: 10749,
  drama: 18,
};

const ViewAll = () => {

  const { category, type } = useParams();
  const finalCategory = category || type;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let res = null;

        const clean = finalCategory?.trim().toLowerCase();
        console.log("CATEGORY:", clean);

        if (clean === "top_rated") {
          res = await axios.get("/movie/top_rated");
        }
        else if (clean === "popular") {
          res = await axios.get("/movie/popular");
        }
        else if (
          clean === "now_playing" ||
          clean === "recent" ||
          clean === "recently"
        ) {
          res = await axios.get("/movie/now_playing");
        }
        else if (genreMap[clean]) {
          res = await axios.get("/discover/movie", {
            params: {
              with_genres: genreMap[clean],
            },
          });
        }

        console.log("API RESPONSE:", res);

        if (res?.data?.results) {
          setMovies(res.data.results);
        } else {
          console.log("NO DATA FOUND");
          setMovies([]);
        }

      } catch (err) {
        console.error("API ERROR:", err);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [finalCategory]);
  const formatTitle = () => {
    const clean = finalCategory?.trim().toLowerCase();

    if (!clean) return "Movies";

    if (clean === "top_rated") return "Top Rated Movies";
    if (clean === "popular") return "Popular Movies";
    if (clean === "now_playing" || clean === "recent" || clean === "recently")
      return "Recently Added Movies";

    return `${clean.charAt(0).toUpperCase() + clean.slice(1)} Movies`;
  };

  return (
    <div className="p-6 text-white bg-black">
      <h1 className="text-3xl font-bold mb-8 text-center">{formatTitle()}</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-center">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAll;