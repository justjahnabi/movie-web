import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import CategoryPage from "../pages/CategoryPage";
import ViewAll from "../pages/ViewAll";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/:category" element={<CategoryPage />} />
                <Route path="/view-all/:type" element={<ViewAll />} />
                <Route path="/view-all/:category" element={<ViewAll />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;