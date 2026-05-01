import { motion } from "framer-motion";
import BillSummary from "./BillSummary";
import Button from "../../components/UI/Button";
import { useCart } from "../cart/useCart";

export default function BillingPage({ onPlaceOrder, onBack }) {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <section className="min-h-screen pt-28 pb-16 px-6 bg-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-6xl block mb-4">🛒</span>
          <h2 className="font-display text-3xl font-bold text-coffee mb-4">
            Nothing to checkout
          </h2>
          <p className="text-text-light mb-8">
            Add items to your cart to proceed.
          </p>
          <Button onClick={onBack}>Back to Menu</Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Checkout
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-coffee mt-3 mb-2">
            Your Bill
          </h2>
          <p className="text-text-light">Review your order before placing it</p>
        </motion.div>

        {/* Bill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <BillSummary />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            ← Back to Menu
          </Button>
          <Button
            variant="accent"
            className="flex-1 !py-4"
            onClick={onPlaceOrder}
          >
            Place Order & Pay
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
