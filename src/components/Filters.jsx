function Filters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/60 backdrop-blur-md border-t border-pink-200">
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="px-3 sm:px-4 py-2 border-2 border-pink-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-400 transition-colors shadow-sm hover:shadow-md flex-1 sm:flex-none min-w-0 sm:min-w-[140px]"
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
      </select>

      <select
        name="year"
        value={filters.year}
        onChange={handleChange}
        className="px-3 sm:px-4 py-2 border-2 border-pink-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-400 transition-colors shadow-sm hover:shadow-md flex-1 sm:flex-none min-w-0 sm:min-w-[140px]"
      >
        <option value="">All Years</option>
        {Array.from({ length: 24 }, (_, i) => 2024 - i).map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        name="rating"
        value={filters.rating}
        onChange={handleChange}
        className="px-3 sm:px-4 py-2 border-2 border-pink-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-400 transition-colors shadow-sm hover:shadow-md flex-1 sm:flex-none min-w-0 sm:min-w-[140px]"
      >
        <option value="">All Ratings</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
        <option value="5">5+</option>
      </select>
    </div>
  );
}

export default Filters;