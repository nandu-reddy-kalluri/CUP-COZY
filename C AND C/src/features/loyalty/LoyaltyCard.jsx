import { motion, AnimatePresence } from "framer-motion";
import { useLoyalty } from "./useLoyalty";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";

const stampVariant = {
  empty: { scale: 1, opacity: 0.3 },
  filled: {
    scale: [0, 1.3, 1],
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

export default function LoyaltyCard({ isOpen, onClose }) {
  const { stamps, maxStamps, showReward, claimReward } = useLoyalty();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎫</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-text dark:text-cream">
              Loyalty Card
            </h2>
            <p className="text-text-light text-sm mt-2">
              Collect {maxStamps} stamps and get a free drink!
            </p>
          </div>

          {/* Stamp Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.from({ length: maxStamps }).map((_, i) => {
              const isFilled = i < stamps;
              return (
                <motion.div
                  key={i}
                  variants={stampVariant}
                  initial="empty"
                  animate={isFilled ? "filled" : "empty"}
                  className={`
                    aspect-square rounded-2xl flex items-center justify-center text-3xl
                    border-2 border-dashed transition-colors duration-300
                    ${
                      isFilled
                        ? "bg-accent/10 border-accent"
                        : "bg-cream dark:bg-card border-cream-dark dark:border-text-light/20"
                    }
                  `}
                >
                  {isFilled ? "☕" : <span className="text-text-light/30 text-xl">{i + 1}</span>}
                </motion.div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-light">Progress</span>
              <span className="font-semibold text-coffee dark:text-accent">
                {stamps} / {maxStamps}
              </span>
            </div>
            <div className="h-3 bg-cream-dark dark:bg-card rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-coffee to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stamps / maxStamps) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>

          {/* Info */}
          <p className="text-center text-text-light text-xs">
            {stamps >= maxStamps
              ? "🎉 You've earned a free drink! Claim your reward."
              : `${maxStamps - stamps} more ${maxStamps - stamps === 1 ? "order" : "orders"} until your free drink!`}
          </p>
        </div>
      </Modal>

      {/* Reward Modal */}
      <Modal isOpen={showReward} onClose={claimReward} maxWidth="max-w-sm">
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-7xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-coffee dark:text-accent mb-3">
            Free Drink!
          </h2>
          <p className="text-text-light mb-6">
            Congratulations! You've collected all {maxStamps} stamps.
            Enjoy a complimentary drink on us!
          </p>
          <Button variant="accent" onClick={claimReward} className="w-full">
            Claim Reward ☕
          </Button>
        </div>
      </Modal>
    </>
  );
}
