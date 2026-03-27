import React from 'react'
import { useParams } from "react-router-dom";

const CategoryPage = () => {
    const { category } = useParams();
    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl capitalize">{category} Movies</h1>
        </div>
    )
}

export default CategoryPage
