import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200 shadow-sm">
          <p className="text-gray-500 font-medium">✧ No movies found. Try searching! ✧</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;