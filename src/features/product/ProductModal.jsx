import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import Fake3DViewer from "./Fake3DViewer";
import { useCart } from "../cart/useCart";

export default function ProductModal({ product, isOpen, onClose }) {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* 3D Image Viewer */}
        <div className="p-6 bg-cream-dark/50">
          <Fake3DViewer image={product.image} name={product.name} />
        </div>

        {/* Details */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* Tags */}
            <div className="flex gap-2 mb-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-cream-dark text-coffee text-xs font-medium capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-2">
              {product.name}
            </h2>

            {/* Category */}
            <span className="text-accent text-sm font-semibold tracking-wide">
              {product.category}
            </span>

            {/* Description */}
            <p className="text-text-light text-sm leading-relaxed mt-4 mb-6">
              {product.description}
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-cream rounded-xl p-3 text-center">
                <span className="text-xs text-text-light block mb-1">Calories</span>
                <span className="text-lg font-semibold text-coffee">{product.calories}</span>
                <span className="text-xs text-text-light ml-1">kcal</span>
              </div>
              <div className="bg-cream rounded-xl p-3 text-center">
                <span className="text-xs text-text-light block mb-1">Size</span>
                <span className="text-sm font-semibold text-coffee">{product.size}</span>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gradient">
              ₹{product.price}
            </span>
            <Button
              variant="accent"
              className="flex-1"
              onClick={handleAdd}
              icon="🛒"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
