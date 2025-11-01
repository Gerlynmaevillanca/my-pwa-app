import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Film, Users, Play, Star } from "lucide-react";
import MovieList from "../components/MovieList";

const API_KEY = "3ae4907c";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);

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

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200 shadow-sm animate-pulse">
            <p className="text-gray-500 font-medium">
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

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-3 cursor-pointer bg-white/80 backdrop-blur-xl text-gray-700 rounded-full hover:bg-pink-50 transition-all hover:scale-105 shadow-md border-2 border-pink-200 flex items-center gap-2 font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Movies</span>
        </button>

        {/* Movie Details Card */}
        <div className="relative">
          <div className="absolute -inset-4 bg-linear-to-r from-pink-300 via-purple-300 to-rose-300 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border-2 border-pink-200">
            <div className="flex flex-col md:flex-row gap-8 p-8">
              {/* Poster */}
              <div className="md:w-1/3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-pink-200 to-purple-200 rounded-2xl blur-xl opacity-50"></div>
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/400x600/FFC0CB/FFFFFF?text=No+Poster"
                    }
                    alt={movie.Title}
                    className="relative w-full rounded-2xl shadow-xl border-4 border-white"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-3">
                    {movie.Title}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-100 to-purple-100 rounded-full border border-pink-200">
                    <Star
                      className="text-yellow-500"
                      size={16}
                      fill="currentColor"
                    />
                    <span className="text-gray-700 font-semibold">
                      {movie.imdbRating || "N/A"} / 10
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <Film className="text-pink-500 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        Genre
                      </p>
                      <p className="text-gray-700">{movie.Genre}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <Calendar className="text-purple-500 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        Released
                      </p>
                      <p className="text-gray-700">{movie.Released}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                    <Users className="text-rose-500 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        Director
                      </p>
                      <p className="text-gray-700">{movie.Director}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <p className="text-sm font-semibold text-gray-500 mb-2">
                      Cast
                    </p>
                    <p className="text-gray-700">{movie.Actors}</p>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    ✧ Plot
                  </p>
                  <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        movie.Title + " trailer"
                      )}`
                    )
                  }
                  className="w-full px-6 py-4 bg-linear-to-r from-pink-300 to-rose-300 cursor-pointer text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 transition-all"
                >
                  <Play size={20} fill="white" />
                  <span>Watch Trailer on YouTube</span>
                </button>

                {/* Favorites Button */}
                <button
                  onClick={() => {
                    const stored =
                      JSON.parse(localStorage.getItem("favorites")) || [];
                    if (!stored.find((m) => m.imdbID === movie.imdbID)) {
                      stored.push(movie);
                      localStorage.setItem(
                        "favorites",
                        JSON.stringify(stored)
                      );
                      alert("Added to Favorites ❤️");
                    }
                  }}
                  className="w-full px-6 py-4 bg-white text-pink-600 border border-pink-300 rounded-2xl font-semibold hover:bg-pink-50 transition-all"
                >
                  ❤️ Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-pink-600 mb-4">
            Related Movies ✧
          </h3>
          {related.length > 0 ? (
            <MovieList movies={related} />
          ) : (
            <p className="text-gray-500 text-center">
              No related movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
