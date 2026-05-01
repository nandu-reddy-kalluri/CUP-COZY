import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./useCart";
import CartItem from "./CartItem";
import Button from "../../components/UI/Button";

// GPU-friendly drawer animation (item #4: opacity + translateX only)
const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function CartDrawer({ onCheckout }) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  const handleCheckout = useCallback(() => {
    closeCart();
    onCheckout();
  }, [closeCart, onCheckout]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream-dark/50">
              <div>
                <h2 className="font-display text-2xl font-bold text-text">
                  Your Cart
                </h2>
                <p className="text-text-light text-sm mt-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-text-light hover:text-coffee transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <span className="text-6xl mb-4">☕</span>
                    <h3 className="font-display text-xl font-semibold text-text mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-text-light text-sm">
                      Discover our handcrafted menu and add your favorites!
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-cream-dark/50 bg-cream/50">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-light text-sm">Subtotal</span>
                  <span className="text-text font-medium">₹{totalPrice}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-light text-sm">Tax (5%)</span>
                  <span className="text-text font-medium">₹{Math.round(totalPrice * 0.05)}</span>
                </div>
                <div className="flex items-center justify-between mb-6 pt-3 border-t border-cream-dark/50">
                  <span className="text-text font-semibold text-lg">Total</span>
                  <span className="text-2xl font-bold text-gradient">
                    ₹{totalPrice + Math.round(totalPrice * 0.05)}
                  </span>
                </div>

                <Button
                  variant="accent"
                  className="w-full !py-4"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
