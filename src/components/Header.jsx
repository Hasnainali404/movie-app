import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchInput from "../components/SearchInput";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-linear-to-b from-black/80 to-black/40 backdrop-blur px-4 md:px-12 py-4">
      <div className="flex items-center justify-between">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-red-600 font-black text-2xl md:text-3xl tracking-tighter"
            onClick={() => setOpen(false)}
          >
            NETFLIX
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <button className="hover:text-white">TV Shows</button>
            <button className="hover:text-white">Movies</button>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SearchInput />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden mt-4 rounded-xl bg-black/90 border border-white/10 p-4 space-y-3 text-gray-300 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/"
            className="block hover:text-white"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <button className="block w-full text-left hover:text-white">
            TV Shows
          </button>
          <button className="block w-full text-left hover:text-white">
            Movies
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
