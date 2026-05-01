import { motion } from "framer-motion";

export default function CustomizerOption({ label, options, selected, onSelect, type = "single" }) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-sm text-text dark:text-cream mb-3 uppercase tracking-wider">
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected =
            type === "multi"
              ? selected.includes(option.value)
              : selected === option.value;

          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(option.value)}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer
                transition-all duration-200 border-2
                ${
                  isSelected
                    ? "bg-coffee dark:bg-accent text-white border-coffee dark:border-accent shadow-md"
                    : "bg-white dark:bg-card text-text dark:text-cream border-cream-dark dark:border-text-light/20 hover:border-coffee dark:hover:border-accent"
                }
              `}
            >
              {option.emoji && <span className="mr-1.5">{option.emoji}</span>}
              {option.label}
              {option.price > 0 && (
                <span className="ml-1 text-xs opacity-70">+₹{option.price}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
