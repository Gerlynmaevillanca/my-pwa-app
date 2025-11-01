function Filters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white/60 backdrop-blur-md border-t border-pink-200">
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="px-4 py-2 border rounded-lg text-gray-700"
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
        className="px-4 py-2 border rounded-lg text-gray-700"
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
        className="px-4 py-2 border rounded-lg text-gray-700"
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
