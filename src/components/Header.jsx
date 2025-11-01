import { useState } from "react";
import { Menu, X, Film } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white/70 backdrop-blur-lg shadow-md border-b border-pink-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
        <div className="flex items-center gap-2 animate-pulse">
          <Film className="text-pink-500 w-7 h-7" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            C<span className="text-pink-500">Movies</span>
          </h1>
        </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Favorites
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-pink-200 shadow-lg">
          <nav className="flex flex-col items-center py-3 space-y-3 text-gray-700 font-medium">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
