import { Search, Sparkles } from 'lucide-react';

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex justify-center my-8 px-4">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-pink-300 via-purple-300 to-rose-300 rounded-full blur opacity-20"></div>
        <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-full border-2 border-pink-200 shadow-lg hover:border-pink-300 transition-all">
          <div className="pl-6 text-pink-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="✧ Search for magical movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="flex-1 p-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={onSearch}
            className="m-1 px-6 py-3 bg-linear-to-r from-pink-300 to-rose-300 text-white rounded-full font-medium shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Search</span>
            <Sparkles size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;