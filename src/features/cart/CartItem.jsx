import { memo, useCallback } from "react";
import { motion } from "framer-motion";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleDecrease = useCallback(() => {
    onUpdateQuantity(item.id, -1);
  }, [onUpdateQuantity, item.id]);

  const handleIncrease = useCallback(() => {
    onUpdateQuantity(item.id, 1);
  }, [onUpdateQuantity, item.id]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [onRemove, item.id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-cream hover:bg-cream-dark/60 transition-colors"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        loading="lazy"
        width="64"
        height="64"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-text truncate">
          {item.name}
        </h4>
        <p className="text-accent font-bold text-sm mt-1">
          ₹{item.price * item.quantity}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleDecrease}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-coffee font-bold text-lg shadow-sm hover:bg-cream-dark transition-colors cursor-pointer"
        >
          −
        </motion.button>
        <span className="w-6 text-center font-semibold text-sm text-text">
          {item.quantity}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleIncrease}
          className="w-8 h-8 rounded-full bg-coffee flex items-center justify-center text-white font-bold text-lg shadow-sm hover:bg-coffee-light transition-colors cursor-pointer"
        >
          +
        </motion.button>
      </div>

      {/* Remove */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleRemove}
        className="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors cursor-pointer flex-shrink-0"
        aria-label="Remove item"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

// Only re-render if item data or handlers changed
export default memo(CartItem, (prev, next) => {
  return prev.item.id === next.item.id &&
    prev.item.quantity === next.item.quantity &&
    prev.item.price === next.item.price &&
    prev.onUpdateQuantity === next.onUpdateQuantity &&
    prev.onRemove === next.onRemove;
});

