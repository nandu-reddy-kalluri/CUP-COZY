import { memo } from "react";
import { motion } from "framer-motion";
import { categories } from "../../data/menu";

const FilterTabs = memo(function FilterTabs({ activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat)}
          className={`
            relative px-6 py-2.5 rounded-full text-sm font-medium
            transition-colors duration-200 cursor-pointer
            ${
              activeCategory === cat
                ? "bg-coffee text-white shadow-md"
                : "bg-white text-text-light hover:text-coffee hover:bg-cream-dark"
            }
          `}
        >
          {activeCategory === cat && (
            <motion.div
              layoutId="filter-bg"
              className="absolute inset-0 bg-coffee rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ zIndex: -1 }}
            />
          )}
          {cat}
        </motion.button>
      ))}
    </div>
  );
});

export default FilterTabs;
