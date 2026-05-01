import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "../payments/QRCode";
import Button from "../../components/UI/Button";
import { useLoyalty } from "../loyalty/useLoyalty";

export default function OrderSuccess({ orderId, amount, onGoHome }) {
  const [showQR, setShowQR] = useState(true);
  const [paid, setPaid] = useState(false);
  const { addStamp } = useLoyalty();

  const handleSimulatePay = useCallback(() => {
    setPaid(true);
    setShowQR(false);
    addStamp();
  }, [addStamp]);

  // Confetti-like particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: -(Math.random() * 300 + 100),
    rotation: Math.random() * 720 - 360,
    scale: Math.random() * 0.6 + 0.4,
    delay: Math.random() * 0.5,
    color: ["#f97316", "#7c2d12", "#fef3c7", "#059669", "#fb923c"][i % 5],
  }));

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 bg-cream flex items-center justify-center overflow-hidden">
      <div className="max-w-lg w-full mx-auto text-center relative">
        <AnimatePresence mode="wait">
          {showQR ? (
            <motion.div
              key="qr"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Payment
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee mt-3 mb-8">
                Scan & Pay
              </h2>

              <QRCode amount={amount} orderId={orderId} />

              <div className="mt-8">
                <Button
                  variant="accent"
                  onClick={handleSimulatePay}
                  className="!px-10"
                >
                  ✓ Simulate Payment
                </Button>
                <p className="text-text-light text-xs mt-3">
                  (This is a demo — click to simulate successful payment)
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              {/* Confetti particles */}
              {paid &&
                particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: [1, 1, 0],
                      scale: p.scale,
                      rotate: p.rotation,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: p.delay,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-20 w-3 h-3 rounded-sm"
                    style={{ backgroundColor: p.color }}
                  />
                ))}

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-16 h-16 rounded-full bg-success flex items-center justify-center"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              </motion.div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee mb-3">
                Order Confirmed!
              </h2>
              <p className="text-text-light text-lg mb-2">
                Thank you for ordering at Cup & Cozy
              </p>

              {/* Order ID */}
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cream-dark mt-4 mb-8">
                <span className="text-text-light text-sm">Order ID:</span>
                <span className="font-mono font-bold text-coffee text-lg">
                  #{orderId}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-light text-sm">Amount Paid</span>
                  <span className="text-2xl font-bold text-gradient">₹{amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-light text-sm">Payment Status</span>
                  <span className="text-success font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Paid
                  </span>
                </div>
              </div>

              {/* Loyalty stamp earned */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-cream-dark rounded-xl p-4 mb-6 flex items-center gap-3"
              >
                <span className="text-2xl">🎫</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-text">Loyalty stamp earned!</p>
                  <p className="text-xs text-text-light">Keep collecting for a free drink.</p>
                </div>
              </motion.div>

              <Button
                variant="primary"
                onClick={onGoHome}
                className="!px-10"
              >
                ← Back to Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
