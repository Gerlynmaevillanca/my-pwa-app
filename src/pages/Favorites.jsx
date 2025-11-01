import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, X } from "lucide-react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleUnfavorite = (imdbID) => {
    const updated = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-200 opacity-30 text-9xl">
          ✦
        </div>
        <div className="absolute top-40 right-20 text-purple-200 opacity-20 text-7xl">
          ♡
        </div>
        <div className="absolute bottom-32 left-1/4 text-rose-200 opacity-25 text-6xl">
          ✧
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-8 text-center">
          Your Favorites ❤️
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200 shadow-sm">
              <p className="text-gray-500 font-medium">
                ✧ No favorites yet. Start adding some movies! ✧
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                className="group relative cursor-pointer"
              >
                {/* Unfavorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnfavorite(movie.imdbID);
                  }}
                  className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  title="Remove from favorites"
                >
                  <X size={16} />
                </button>

                {/* Hover background glow */}
                <div className="absolute inset-0 bg-linear-to-br from-pink-200 to-purple-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"></div>

                {/* Card container */}
                <div
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                  className="relative bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:border-pink-300 transition-all hover:-translate-y-2 flex flex-col justify-between h-112"
                >
                  {/* Poster Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/300x450/FFC0CB/FFFFFF?text=No+Image"
                      }
                      alt={movie.Title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Details Section */}
                  <div className="p-4 flex flex-col justify-between grow">
                    <div>
                      <h2 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors leading-tight">
                        {movie.Title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} className="text-purple-400" />
                        <span>{movie.Year}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-xs text-pink-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;