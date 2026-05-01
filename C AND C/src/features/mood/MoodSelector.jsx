import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuItems from "../../data/menu";
import ProductCard from "../menu/ProductCard";

const moods = [
  {
    key: "energized",
    emoji: "⚡",
    label: "Energized",
    tagline: "Power up with bold brews",
    color: "from-orange-500 to-red-500",
    ids: [3, 1, 8, 5],
  },
  {
    key: "cozy",
    emoji: "🧸",
    label: "Cozy",
    tagline: "Warm hugs in a cup",
    color: "from-amber-600 to-orange-400",
    ids: [1, 10, 6, 5],
  },
  {
    key: "chill",
    emoji: "🧊",
    label: "Chill",
    tagline: "Cool down, slow sip",
    color: "from-sky-400 to-blue-500",
    ids: [2, 8, 9, 7],
  },
  {
    key: "adventurous",
    emoji: "🌍",
    label: "Adventurous",
    tagline: "Try something new today",
    color: "from-emerald-500 to-teal-500",
    ids: [4, 9, 11, 12],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function MoodSelector({ onProductClick }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const moodData = moods.find((m) => m.key === selectedMood);
  const recommendedItems = moodData
    ? moodData.ids.map((id) => menuItems.find((item) => item.id === id)).filter(Boolean)
    : [];

  return (
    <section className="py-24 px-6 bg-cream dark:bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Just For You
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-coffee dark:text-coffee mt-3 mb-4">
            How Are You Feeling?
          </h2>
          <p className="text-text-light text-lg max-w-xl mx-auto">
            Tell us your mood and we'll recommend the perfect pick.
          </p>
        </motion.div>

        {/* Mood Options */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {moods.map((mood) => (
            <motion.button
              key={mood.key}
              variants={item}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setSelectedMood(selectedMood === mood.key ? null : mood.key)
              }
              className={`
                relative overflow-hidden rounded-2xl p-6 text-center cursor-pointer
                transition-all duration-300
                ${
                  selectedMood === mood.key
                    ? "ring-3 ring-accent shadow-lg shadow-accent/20"
                    : "card-shadow hover:card-shadow-hover"
                }
              `}
            >
              {/* Gradient bg */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mood.color} transition-opacity duration-300 ${
                  selectedMood === mood.key ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  selectedMood === mood.key ? "opacity-0" : "opacity-100"
                } bg-white dark:bg-card`}
              />

              <div className="relative z-10">
                <span className="text-4xl block mb-3">{mood.emoji}</span>
                <h3
                  className={`font-display text-lg font-semibold mb-1 transition-colors ${
                    selectedMood === mood.key ? "text-white" : "text-text dark:text-cream"
                  }`}
                >
                  {mood.label}
                </h3>
                <p
                  className={`text-xs transition-colors ${
                    selectedMood === mood.key
                      ? "text-white/80"
                      : "text-text-light"
                  }`}
                >
                  {mood.tagline}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence mode="wait">
          {selectedMood && moodData && (
            <motion.div
              key={selectedMood}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-text dark:text-cream">
                  {moodData.emoji} Perfect picks for your{" "}
                  <span className="text-accent">{moodData.label}</span> mood
                </h3>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {recommendedItems.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} onClick={onProductClick} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
