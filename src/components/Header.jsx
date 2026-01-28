import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-linear-to-b from-black/80 to-transparent px-4 md:px-12 py-4 flex items-center justify-between transition-colors duration-300">
      {/* Left side */}
      <div className="flex items-center gap-4 md:gap-8 min-w-0">
        <Link
          to="/"
          className="text-red-600 font-black text-2xl md:text-3xl tracking-tighter hover:scale-105 transition-transform shrink-0"
        >
          NETFLIX
        </Link>

        <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <button className="hover:text-white transition-colors">
            TV Shows
          </button>
          <button className="hover:text-white transition-colors">Movies</button>
        </nav>
      </div>

      {/* Right side (search) */}
      <div className="min-w-0 shrink">
        <SearchInput />
      </div>
    </header>
  );
};

export default Header;
