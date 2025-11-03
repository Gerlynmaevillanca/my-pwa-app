import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Film,
  Users,
  Play,
  Star,
  Heart,
} from "lucide-react";
import MovieList from "../components/MovieList";

const API_KEY = "daac218b";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // New states for reviews
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviews, setReviews] = useState([]);

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

  // Load reviews for this movie
  useEffect(() => {
    const storedReviews =
      JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
    setReviews(storedReviews);
  }, [id]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updated = stored.filter((m) => m.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      alert("Removed from Favorites 💔");
    } else {
      stored.push(movie);
      localStorage.setItem("favorites", JSON.stringify(stored));
      setIsFavorite(true);
      alert("Added to Favorites ❤️");
    }
  };

  // Handle submitting a review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!rating || reviewMessage.trim() === "") {
      alert("Please provide both a rating and a review message!");
      return;
    }

    const newReview = {
      rating,
      message: reviewMessage,
      date: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setRating(0);
    setHoverRating(0);
    setReviewMessage("");
    alert("Review submitted successfully! 🌟");
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : "N/A";

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200 shadow-sm animate-pulse">
            <p className="text-base text-gray-500 font-medium">
              ✧ Loading magical details... ✧
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-200 opacity-30 text-7xl">
          ✦
        </div>
        <div className="absolute bottom-20 right-20 text-purple-200 opacity-20 text-6xl">
          ♡
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-3 bg-white/80 backdrop-blur-xl text-gray-700 rounded-full hover:bg-pink-50 transition-all active:scale-95 border-2 border-pink-200 flex items-center gap-2 font-medium text-base shadow-md"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Movie Details */}
        <div className="relative bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl border-2 border-pink-200 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 p-8">
            {/* Poster */}
            <div className="md:w-1/3">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/400x600/FFC0CB/FFFFFF?text=No+Poster"
                }
                alt={movie.Title}
                className="w-full rounded-2xl shadow-lg border-4 border-white"
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                {movie.Title}
              </h2>

              <div className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full border border-pink-200 w-fit">
                <Star
                  className="text-yellow-500"
                  size={16}
                  fill="currentColor"
                />
                <span className="font-semibold text-gray-700">
                  IMDb: {movie.imdbRating || "N/A"} / 10
                </span>
                <span className="ml-2 text-gray-500 text-sm">
                  | User Avg: {averageRating}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>

              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Released:</strong> {movie.Released}
              </p>
              <p>
                <strong>Cast:</strong> {movie.Actors}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        movie.Title + " trailer"
                      )}`
                    )
                  }
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-semibold shadow hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <Play size={18} fill="white" />
                  Watch Trailer
                </button>

                <button
                  onClick={toggleFavorite}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-50"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? "white" : "none"}
                    className={isFavorite ? "text-white" : "text-pink-600"}
                  />
                  {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ User Rating & Review Section */}
        <div className="mt-10 bg-white/70 backdrop-blur-md border border-pink-200 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-pink-600 mb-4">
            Rate & Review This Movie ✨
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={28}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(num)}
                  className={`cursor-pointer ${
                    num <= (hoverRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <textarea
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Write your thoughts about the movie..."
              className="w-full p-3 border rounded-xl border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
              rows={3}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-semibold shadow hover:shadow-lg active:scale-95"
            >
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          <div className="mt-6">
            <h4 className="font-semibold text-lg text-gray-700 mb-3">
              User Reviews ({reviews.length})
            </h4>
            {reviews.length === 0 ? (
              <p className="text-gray-500 italic">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r, index) => (
                  <div
                    key={index}
                    className="p-4 bg-pink-50 rounded-xl border border-pink-100"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{r.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Reviewed on {r.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Movies Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-pink-600 mb-3">
            Related Movies ✧
          </h3>
          {related.length > 0 ? (
            <MovieList movies={related} />
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No related movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
