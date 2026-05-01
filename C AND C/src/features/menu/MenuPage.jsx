import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import menuItems from "../../data/menu";
import FilterTabs from "./FilterTabs";
import MenuGrid from "./MenuGrid";

export default function MenuPage({ onProductClick }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="py-24 px-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Our Menu
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-coffee mt-3 mb-4">
            Handcrafted With Love
          </h2>
          <p className="text-text-light text-lg max-w-xl mx-auto">
            From artisan coffee to freshly baked treats — every item is prepared
            with care and the finest ingredients.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <FilterTabs
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </motion.div>

        {/* Grid */}
        <MenuGrid items={filteredItems} onProductClick={onProductClick} />
      </div>
    </section>
  );
}
