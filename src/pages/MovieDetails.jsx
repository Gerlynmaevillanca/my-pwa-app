import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Film, Users, Play, Star, Heart } from "lucide-react";
import MovieList from "../components/MovieList";

const API_KEY = "daac218b";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  // Check if movie is in favorites
  useEffect(() => {
    if (!movie) return;
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const isInFavorites = stored.some((m) => m.imdbID === movie.imdbID);
    setIsFavorite(isInFavorites);
  }, [movie]);

  // Fetch related movies based on genre
  useEffect(() => {
    if (!movie || !movie.Genre) return;
    const fetchRelated = async () => {
      const firstGenre = movie.Genre.split(",")[0].trim();
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          firstGenre
        )}`
      );
      const data = await response.json();
      if (data.Search) {
        const filtered = data.Search.filter((m) => m.imdbID !== id);
        setRelated(filtered);
      } else {
        setRelated([]);
      }
    };
    fetchRelated();
  }, [movie, id]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (isFavorite) {
      // Remove from favorites
      const updated = stored.filter((m) => m.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      alert("Removed from Favorites 💔");
    } else {
      // Add to favorites
      stored.push(movie);
      localStorage.setItem("favorites", JSON.stringify(stored));
      setIsFavorite(true);
      alert("Added to Favorites ❤️");
    }
  };

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="inline-block px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200 shadow-sm animate-pulse">
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              ✧ Loading magical details... ✧
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 text-pink-200 opacity-30 text-5xl sm:text-7xl md:text-9xl">
          ✦
        </div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 text-purple-200 opacity-20 text-4xl sm:text-5xl md:text-7xl">
          ♡
        </div>
        <div className="absolute bottom-20 sm:bottom-32 left-1/4 text-rose-200 opacity-25 text-3xl sm:text-4xl md:text-6xl">
          ✧
        </div>
      </div>

      <div className="relative z-10 p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 cursor-pointer bg-white/80 backdrop-blur-xl text-gray-700 rounded-full hover:bg-pink-50 transition-all active:scale-95 sm:hover:scale-105 shadow-md border-2 border-pink-200 flex items-center gap-2 font-medium text-sm sm:text-base"
        >
          <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Back</span>
        </button>

        {/* Movie Details Card */}
        <div className="relative">
          <div className="absolute -inset-2 sm:-inset-4 bg-linear-to-r from-pink-300 via-purple-300 to-rose-300 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-20"></div>
          <div className="relative bg-white/70 backdrop-blur-xl shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-pink-200">
            <div className="flex col md:row gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
              {/* Poster */}
              <div className="w-full md:w-1/3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-pink-200 to-purple-200 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50"></div>
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/400x600/FFC0CB/FFFFFF?text=No+Poster"
                    }
                    alt={movie.Title}
                    className="relative w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border-2 sm:border-4 border-white"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="1 space-y-3 sm:space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                    {movie.Title}
                  </h2>
                  <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-pink-100 to-purple-100 rounded-full border border-pink-200">
                    <Star
                      className="text-yellow-500"
                      size={14}
                      fill="currentColor"
                    />
                    <span className="text-sm sm:text-base text-gray-700 font-semibold">
                      {movie.imdbRating || "N/A"} / 10
                    </span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-pink-50/50 rounded-xl sm:rounded-2xl border border-pink-100">
                    <Film className="text-pink-500 mt-0.5 sm:mt-1 shrink-0" size={18} />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">
                        Genre
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">{movie.Genre}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50/50 rounded-xl sm:rounded-2xl border border-purple-100">
                    <Calendar className="text-purple-500 mt-0.5 sm:mt-1 shrink-0" size={18} />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">
                        Released
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">{movie.Released}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-rose-50/50 rounded-xl sm:rounded-2xl border border-rose-100">
                    <Users className="text-rose-500 mt-0.5 sm:mt-1 shrink-0" size={18} />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">
                        Director
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">{movie.Director}</p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-pink-50/50 rounded-xl sm:rounded-2xl border border-pink-100">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1 sm:mb-2">
                      Cast
                    </p>
                    <p className="text-sm sm:text-base text-gray-700">{movie.Actors}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-100">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1 sm:mb-2">
                    ✧ Plot
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{movie.Plot}</p>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        movie.Title + " trailer"
                      )}`
                    )
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-pink-300 to-rose-300 cursor-pointer text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 transition-all"
                >
                  <Play size={18} fill="white" />
                  <span className="hidden sm:inline">Watch Trailer on YouTube</span>
                  <span className="sm:hidden">Watch Trailer</span>
                </button>

                {/* Favorites Button - Toggle between Add/Remove */}
                <button
                  onClick={toggleFavorite}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 sm:gap-3 ${
                    isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl active:scale-95"
                      : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-50 active:scale-95"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? "white" : "none"}
                    className={isFavorite ? "text-white" : "text-pink-600"}
                  />
                  <span className="hidden sm:inline">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                  <span className="sm:hidden">
                    {isFavorite ? "Remove" : "Add to Favorites"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        <div className="mt-6 sm:mt-8 md:mt-12">
          <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-3 sm:mb-4 px-1">
            Related Movies ✧
          </h3>
          {related.length > 0 ? (
            <MovieList movies={related} />
          ) : (
            <p className="text-sm sm:text-base text-gray-500 text-center py-4">
              No related movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;