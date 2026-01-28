import { Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-4 md:px-12 py-4 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-red-600 font-black text-2xl md:text-3xl tracking-tighter hover:scale-105 transition-transform">
          NETFLIX
        </Link>
        <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <button className="hover:text-white transition-colors">TV Shows</button>
          <button className="hover:text-white transition-colors">Movies</button>
        </nav>
      </div>
      <SearchInput />
    </header>
  );
};

export default Header;