import React from 'react'
import { useState } from "react";
import axios from "../api/axios";
import { Search } from "lucide-react";

const SearchBar = ({ setMovies, movies }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("Recommended");

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.get("/search/movie", { params: { query }, });
      setMovies(res.data.results);
    }
  };

  const handleSort = (type) => {
    setSelected(type);
    setShowDropdown(false);

    let sorted = [...movies];
    if (type === "Highest Rated") {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (type === "Popularity") {
      sorted.sort((a, b) => b.popularity - a.popularity);
    }
    if (type === "What's New") {
      sorted.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }
    if (type === "A-Z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setMovies(sorted);
  };

  const options = [
    "Recommended",
    "What's New",
    "Popularity",
    "Highest Rated",
  ];

  return (
    <div className="flex items-center gap-3 my-4 relative">

      <div className="flex items-center w-full bg-gray-200 dark:bg-gray-800 rounded-lg px-3">
        <Search size={18} className="opacity-60" />
        <input type="text" placeholder="Search Movies" className="w-full p-3 bg-transparent outline-none" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} /></div>

      <div className="relative">
        <button onClick={() => setShowDropdown(!showDropdown)} className="bg-gray-200 dark:bg-gray-800 px-4 py-3 rounded-lg whitespace-nowrap">
          <span className="text-sm">Sort by: </span>
          <span className="font-semibold">{selected}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50">{options.map((opt) => (
            <div key={opt} onClick={() => handleSort(opt)} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"> {opt} </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;