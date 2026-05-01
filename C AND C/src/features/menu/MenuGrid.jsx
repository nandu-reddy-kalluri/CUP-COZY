import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function MenuGrid({ items, onProductClick }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {items.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            layout
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <ProductCard product={product} onClick={onProductClick} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
