import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`/movie/${id}`).then((res) => {
            setMovie(res.data);
        });
    }, [id]);
    if (!movie) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-black to-[#1e293b] p-6">
            <div className="w-full max-w-md bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="w-full h-105 object-cover object-top" />
                <div className="p-5 text-white">
                    <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
                    <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>|</span>
                        <span>{movie.runtime} min</span>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">{movie.overview}</p>
                    <button className="mt-5 w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold">Watch Movie</button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;