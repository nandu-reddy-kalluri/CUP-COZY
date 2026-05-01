import { motion } from "framer-motion";

const milkColors = {
  regular: "#f5f0e8",
  oat: "#e8d5b8",
  almond: "#eddcc4",
  soy: "#f0e6d0",
  coconut: "#faf5ef",
};

const baseColors = {
  espresso: "#3d1c0a",
  latte: "#8B6347",
  cappuccino: "#6B4226",
  coldbrew: "#2d1408",
  matcha: "#6b8e23",
};

export default function CupPreview({ base, milk, size, sweetness, addons }) {
  const cupHeight = size === "small" ? 140 : size === "medium" ? 170 : 200;
  const cupWidth = size === "small" ? 100 : size === "medium" ? 115 : 130;
  const drinkColor = baseColors[base] || baseColors.latte;
  const milkColor = milkColors[milk] || milkColors.regular;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Steam */}
      {base !== "coldbrew" && (
        <div className="flex gap-2 mb-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [-2, -12, -2],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              className="w-1.5 h-6 rounded-full bg-text-light/20"
            />
          ))}
        </div>
      )}

      {/* Cup SVG */}
      <motion.svg
        width={cupWidth + 40}
        height={cupHeight + 30}
        viewBox={`0 0 ${cupWidth + 40} ${cupHeight + 30}`}
        key={`${base}-${milk}-${size}`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Cup body */}
        <defs>
          <linearGradient id="drinkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={milkColor} stopOpacity="0.6" />
            <stop offset={`${100 - sweetness}%`} stopColor={drinkColor} />
            <stop offset="100%" stopColor={drinkColor} />
          </linearGradient>
          <clipPath id="cupClip">
            <path d={`M8,10 L${cupWidth - 4},10 L${cupWidth - 12},${cupHeight} L16,${cupHeight} Z`} />
          </clipPath>
        </defs>

        {/* Cup outline */}
        <path
          d={`M6,8 L${cupWidth - 2},8 L${cupWidth - 12},${cupHeight + 2} L16,${cupHeight + 2} Z`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-coffee/30 dark:text-cream/30"
          rx="4"
        />

        {/* Drink fill */}
        <rect
          x="8"
          y="10"
          width={cupWidth - 12}
          height={cupHeight - 8}
          fill="url(#drinkGrad)"
          clipPath="url(#cupClip)"
          rx="2"
        />

        {/* Foam layer for cappuccino/latte */}
        {(base === "cappuccino" || base === "latte") && (
          <ellipse
            cx={cupWidth / 2 + 2}
            cy="14"
            rx={(cupWidth - 20) / 2}
            ry="6"
            fill={milkColor}
            opacity="0.9"
          />
        )}

        {/* Ice cubes for cold brew */}
        {base === "coldbrew" && (
          <>
            <rect x={cupWidth / 2 - 12} y={cupHeight / 2 - 10} width="12" height="12" rx="3" fill="rgba(255,255,255,0.5)" />
            <rect x={cupWidth / 2 + 4} y={cupHeight / 2 + 5} width="10" height="10" rx="3" fill="rgba(255,255,255,0.4)" />
            <rect x={cupWidth / 2 - 6} y={cupHeight / 2 + 18} width="11" height="11" rx="3" fill="rgba(255,255,255,0.35)" />
          </>
        )}

        {/* Handle */}
        <path
          d={`M${cupWidth - 1},${cupHeight * 0.25} Q${cupWidth + 28},${cupHeight * 0.25} ${cupWidth + 28},${cupHeight * 0.55} Q${cupWidth + 28},${cupHeight * 0.75} ${cupWidth - 1},${cupHeight * 0.75}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-coffee/30 dark:text-cream/30"
        />

        {/* Addon indicators */}
        {addons.includes("whipped") && (
          <ellipse
            cx={cupWidth / 2 + 2}
            cy="6"
            rx={(cupWidth - 16) / 2}
            ry="8"
            fill="#FFFDD0"
            stroke="currentColor"
            strokeWidth="1"
            className="text-coffee/10"
          />
        )}

        {addons.includes("cinnamon") && (
          <g transform={`translate(${cupWidth / 2 - 4}, 2)`}>
            <rect width="8" height="2" rx="1" fill="#8B4513" opacity="0.7" />
          </g>
        )}
      </motion.svg>

      {/* Size label */}
      <motion.p
        key={size}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-text-light mt-2 capitalize"
      >
        {size} Cup
      </motion.p>
    </motion.div>
  );
}
