import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbient } from "./useAmbient";

export default function AmbientSound() {
  const { isPlaying, volume, toggle, changeVolume } = useAmbient();
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex items-end gap-3"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {/* Volume slider */}
      <AnimatePresence>
        {showVolume && isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            className="bg-white dark:bg-card rounded-xl shadow-lg p-3 flex items-center gap-3"
          >
            <span className="text-xs text-text-light whitespace-nowrap">Vol</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-20 h-1.5 accent-accent cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          shadow-lg cursor-pointer transition-colors duration-300
          ${
            isPlaying
              ? "bg-accent text-white"
              : "bg-white dark:bg-card text-text-light hover:text-coffee dark:hover:text-accent"
          }
        `}
        title={isPlaying ? "Mute café ambience" : "Play café ambience"}
      >
        {isPlaying ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </motion.div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </motion.button>

      {/* Label */}
      {!isPlaying && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-text-light whitespace-nowrap bg-white dark:bg-card px-2 py-1 rounded-lg shadow-sm pointer-events-none"
        >
          Café vibes 🎵
        </motion.span>
      )}
    </div>
  );
}
