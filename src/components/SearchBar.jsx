import { Search, Sparkles } from 'lucide-react';

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex justify-center my-4 sm:my-6 md:my-8 px-3 sm:px-4">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-pink-300 via-purple-300 to-rose-300 rounded-full blur opacity-20"></div>
        <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-full border-2 border-pink-200 shadow-lg hover:border-pink-300 transition-all">
          <div className="pl-3 sm:pl-4 md:pl-6 text-pink-400">
            <Search size={18} className="sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            placeholder="✧ Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="flex-1 p-3 sm:p-4 bg-transparent outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={onSearch}
            className="m-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-linear-to-r from-pink-300 to-rose-300 text-white rounded-full text-sm sm:text-base font-medium shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all active:scale-95 sm:hover:scale-105 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden"><Search size={14} className="sm:w-4 sm:h-4"  /></span>
            <Sparkles size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;