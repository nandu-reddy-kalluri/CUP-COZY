import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        bg-white rounded-2xl overflow-hidden
        card-shadow
        ${hover ? "hover:card-shadow-hover cursor-pointer" : ""}
        transition-shadow duration-300
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
