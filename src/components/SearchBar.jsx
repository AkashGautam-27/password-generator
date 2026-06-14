import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import "../index.css";
const SearchBar = ({ search, setSearch }) => {
  return (
   <motion.div
  className="
    relative
    bg-slate-800/60
    backdrop-blur-xl
    border border-slate-700
    rounded-2xl
    overflow-hidden
  "
>
  <FaSearch
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-slate-400
    "
  />

  <input
    type="text"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    placeholder="Search passwords..."
    className="
      w-full
      bg-transparent
      text-white
      pl-12
      pr-4
      py-4
      outline-none
    "
  />
</motion.div>
  );
};

export default SearchBar;