import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import CustomizerOption from "./CustomizerOption";
import CupPreview from "./CupPreview";
import Button from "../../components/UI/Button";
import { useCart } from "../cart/useCart";

const bases = [
  { value: "espresso", label: "Espresso", emoji: "☕", price: 0 },
  { value: "latte", label: "Latte", emoji: "🥛", price: 0 },
  { value: "cappuccino", label: "Cappuccino", emoji: "☁️", price: 0 },
  { value: "coldbrew", label: "Cold Brew", emoji: "🧊", price: 0 },
  { value: "matcha", label: "Matcha", emoji: "🍵", price: 0 },
];

const milks = [
  { value: "regular", label: "Regular", emoji: "🥛", price: 0 },
  { value: "oat", label: "Oat", emoji: "🌾", price: 20 },
  { value: "almond", label: "Almond", emoji: "🌰", price: 25 },
  { value: "soy", label: "Soy", emoji: "🫘", price: 15 },
  { value: "coconut", label: "Coconut", emoji: "🥥", price: 25 },
];

const sizes = [
  { value: "small", label: "Small (200ml)", emoji: "", price: 120 },
  { value: "medium", label: "Medium (350ml)", emoji: "", price: 160 },
  { value: "large", label: "Large (450ml)", emoji: "", price: 200 },
];

const sweetLevels = [
  { value: 0, label: "0%", emoji: "", price: 0 },
  { value: 25, label: "25%", emoji: "", price: 0 },
  { value: 50, label: "50%", emoji: "", price: 0 },
  { value: 75, label: "75%", emoji: "", price: 0 },
  { value: 100, label: "100%", emoji: "", price: 0 },
];

const addons = [
  { value: "extrashot", label: "Extra Shot", emoji: "💪", price: 30 },
  { value: "whipped", label: "Whipped Cream", emoji: "☁️", price: 20 },
  { value: "vanilla", label: "Vanilla Syrup", emoji: "🌸", price: 25 },
  { value: "caramel", label: "Caramel Drizzle", emoji: "🍯", price: 25 },
  { value: "cinnamon", label: "Cinnamon", emoji: "✨", price: 15 },
];

export default function DrinkCustomizer({ onBack }) {
  const { addItem, openCart } = useCart();
  const [base, setBase] = useState("latte");
  const [milk, setMilk] = useState("regular");
  const [size, setSize] = useState("medium");
  const [sweetness, setSweetness] = useState(50);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = useCallback((value) => {
    setSelectedAddons((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  }, []);

  const totalPrice = useMemo(() => {
    const sizePrice = sizes.find((s) => s.value === size)?.price || 0;
    const milkPrice = milks.find((m) => m.value === milk)?.price || 0;
    const addonPrice = selectedAddons.reduce((sum, a) => {
      const addon = addons.find((ad) => ad.value === a);
      return sum + (addon?.price || 0);
    }, 0);
    return sizePrice + milkPrice + addonPrice;
  }, [size, milk, selectedAddons]);

  const drinkName = useMemo(() => {
    const baseName = bases.find((b) => b.value === base)?.label || "Drink";
    const milkName = milk !== "regular" ? ` (${milks.find((m) => m.value === milk)?.label} Milk)` : "";
    return `Custom ${baseName}${milkName}`;
  }, [base, milk]);

  const handleAddToCart = useCallback(() => {
    const customDrink = {
      id: `custom-${Date.now()}`,
      name: drinkName,
      description: `Your custom creation: ${size} ${base} with ${milk} milk, ${sweetness}% sweetness${selectedAddons.length > 0 ? `, + ${selectedAddons.map(a => addons.find(ad => ad.value === a)?.label).join(", ")}` : ""}`,
      price: totalPrice,
      image: base === "matcha" ? "/images/matcha_latte.png" : base === "coldbrew" ? "/images/iced_latte.png" : "/images/cappuccino.png",
      category: "Custom",
      tags: ["custom"],
      calories: 150,
      size: sizes.find((s) => s.value === size)?.label || size,
    };
    addItem(customDrink);
    openCart();
  }, [drinkName, totalPrice, base, size, milk, sweetness, selectedAddons, addItem, openCart]);

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 bg-cream dark:bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Create Your Perfect Drink
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-coffee dark:text-coffee mt-3 mb-2">
            Build Your Drink
          </h2>
          <p className="text-text-light">
            Customize every detail — base, milk, sweetness, and more.
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8">
          {/* Options Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 lg:order-1 lg:col-span-3 bg-white dark:bg-card rounded-3xl p-8 card-shadow"
          >
            <CustomizerOption
              label="☕ Choose Your Base"
              options={bases}
              selected={base}
              onSelect={setBase}
            />

            <CustomizerOption
              label="🥛 Pick Your Milk"
              options={milks}
              selected={milk}
              onSelect={setMilk}
            />

            <CustomizerOption
              label="📏 Select Size"
              options={sizes}
              selected={size}
              onSelect={setSize}
            />

            <div className="mb-6">
              <h4 className="font-semibold text-sm text-text dark:text-cream mb-3 uppercase tracking-wider">
                🍬 Sweetness Level — {sweetness}%
              </h4>
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={sweetness}
                onChange={(e) => setSweetness(parseInt(e.target.value, 10))}
                className="w-full h-2 accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-light mt-1">
                <span>None</span>
                <span>Half</span>
                <span>Full</span>
              </div>
            </div>

            <CustomizerOption
              label="✨ Add-Ons"
              options={addons}
              selected={selectedAddons}
              onSelect={toggleAddon}
              type="multi"
            />
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2 lg:col-span-2"
          >
            <div className="bg-white dark:bg-card rounded-3xl p-8 card-shadow sticky top-28">
              {/* Cup Preview */}
              <div className="flex justify-center mb-6">
                <CupPreview
                  base={base}
                  milk={milk}
                  size={size}
                  sweetness={sweetness}
                  addons={selectedAddons}
                />
              </div>

              {/* Drink Summary */}
              <div className="text-center mb-6">
                <motion.h3
                  key={drinkName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display text-xl font-bold text-text dark:text-cream mb-1"
                >
                  {drinkName}
                </motion.h3>
                <p className="text-text-light text-sm">
                  {sizes.find((s) => s.value === size)?.label} · {sweetness}% sweet
                </p>
                {selectedAddons.length > 0 && (
                  <p className="text-text-light text-xs mt-1">
                    + {selectedAddons.map((a) => addons.find((ad) => ad.value === a)?.label).join(", ")}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-gradient"
                >
                  ₹{totalPrice}
                </motion.span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="accent"
                  className="w-full !py-4"
                  onClick={handleAddToCart}
                  icon="🛒"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={onBack}
                >
                  ← Back to Menu
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
