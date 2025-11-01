import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Your Favorites ❤️</h2>
      <MovieList movies={favorites} />
    </div>
  );
}

export default Favorites;
