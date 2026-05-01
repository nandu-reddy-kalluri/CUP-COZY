import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-coffee text-white hover:bg-coffee-light shadow-md hover:shadow-lg",
  secondary:
    "bg-cream-dark text-coffee hover:bg-accent hover:text-white",
  accent:
    "bg-accent text-white hover:bg-accent-light shadow-md hover:shadow-lg",
  outline:
    "border-2 border-coffee text-coffee hover:bg-coffee hover:text-white",
  ghost:
    "text-coffee hover:bg-cream-dark",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  icon,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}
