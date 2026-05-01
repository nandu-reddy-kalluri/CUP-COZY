import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import Card from "../../components/UI/Card";
import { useCart } from "../cart/useCart";

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function ProductCard({ product, onClick }) {
  const { addItem } = useCart();

  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation();
      addItem(product);
    },
    [addItem, product]
  );

  const handleClick = useCallback(() => {
    onClick(product);
  }, [onClick, product]);

  return (
    <Card onClick={handleClick} className="group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          width="300"
          height="225"
        />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.tags.includes("bestseller") && (
            <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold shadow-md">
              ★ Bestseller
            </span>
          )}
          {product.tags.includes("popular") && (
            <span className="px-3 py-1 rounded-full bg-coffee text-white text-xs font-semibold shadow-md">
              Popular
            </span>
          )}
        </div>
        {/* Quick Add overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-4"
        >
          <span className="text-white text-xs font-medium tracking-wide">
            Click for details
          </span>
        </motion.div>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-lg font-semibold text-text leading-snug">
            {product.name}
          </h3>
          <span className="text-accent font-bold text-lg whitespace-nowrap">
            ₹{product.price}
          </span>
        </div>
        <p className="text-text-light text-sm leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className="w-full py-2.5 rounded-xl bg-cream-dark text-coffee font-medium text-sm hover:bg-accent hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add to Cart
        </motion.button>
      </div>
    </Card>
  );
}

// Custom comparator: only re-render if product data or onClick reference changed
export default memo(ProductCard, (prev, next) => {
  return prev.product.id === next.product.id &&
    prev.product.price === next.product.price &&
    prev.onClick === next.onClick;
});

