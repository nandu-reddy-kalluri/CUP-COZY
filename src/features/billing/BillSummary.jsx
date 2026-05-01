import { useCart } from "../cart/useCart";

export default function BillSummary() {
  const { items, totalPrice } = useCart();
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + tax;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="bg-coffee p-6">
        <h3 className="font-display text-xl font-bold text-white">
          Order Summary
        </h3>
        <p className="text-cream/60 text-sm mt-1">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Items */}
      <div className="p-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover"
                loading="lazy"
                width="40"
                height="40"
              />
              <div>
                <p className="text-sm font-medium text-text">{item.name}</p>
                <p className="text-xs text-text-light">× {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-text">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 pb-6 pt-4 border-t border-cream-dark/50 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-light">Subtotal</span>
          <span className="text-text">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-light">GST (5%)</span>
          <span className="text-text">₹{tax}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-cream-dark/50">
          <span className="font-semibold text-text text-lg">Grand Total</span>
          <span className="font-bold text-2xl text-gradient">₹{grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
