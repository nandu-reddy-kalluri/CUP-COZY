import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider, useCart } from "./features/cart/useCart";
import { ThemeProvider } from "./features/theme/useTheme";
import { LoyaltyProvider } from "./features/loyalty/useLoyalty";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./features/landing/Hero";
import CafeIntro from "./features/landing/CafeIntro";
import MoodSelector from "./features/mood/MoodSelector";
import MenuPage from "./features/menu/MenuPage";
import ProductModal from "./features/product/ProductModal";
import CartDrawer from "./features/cart/CartDrawer";
import DrinkCustomizer from "./features/customizer/DrinkCustomizer";
import BillingPage from "./features/billing/BillingPage";
import OrderSuccess from "./features/orders/OrderSuccess";
import LoyaltyCard from "./features/loyalty/LoyaltyCard";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const { totalPrice, clearCart } = useCart();

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleCheckout = useCallback(() => {
    handleNavigate("billing");
  }, [handleNavigate]);

  const handlePlaceOrder = useCallback(() => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderId(id);
    handleNavigate("success");
  }, [handleNavigate]);

  const handleGoHome = useCallback(() => {
    clearCart();
    setOrderId(null);
    handleNavigate("home");
  }, [clearCart, handleNavigate]);

  const orderAmount = useMemo(() => {
    return totalPrice + Math.round(totalPrice * 0.05);
  }, [totalPrice]);

  const handleOpenLoyalty = useCallback(() => setLoyaltyOpen(true), []);
  const handleCloseLoyalty = useCallback(() => setLoyaltyOpen(false), []);
  const handleExploreMenu = useCallback(() => handleNavigate("menu"), [handleNavigate]);
  const handleBackToMenu = useCallback(() => handleNavigate("menu"), [handleNavigate]);

  // Memoize page content to prevent re-render explosion (item #5)
  const renderPage = useMemo(() => {
    switch (currentPage) {
      case "home":
        return (
          <motion.main key="home" {...pageTransition}>
            <Hero onExplore={handleExploreMenu} />
            <CafeIntro />
            <MoodSelector onProductClick={handleProductClick} />
            <MenuPage onProductClick={handleProductClick} />
          </motion.main>
        );
      case "menu":
        return (
          <motion.main key="menu" {...pageTransition} className="pt-20">
            <MenuPage onProductClick={handleProductClick} />
          </motion.main>
        );
      case "customizer":
        return (
          <motion.main key="customizer" {...pageTransition}>
            <DrinkCustomizer onBack={handleBackToMenu} />
          </motion.main>
        );
      case "billing":
        return (
          <motion.main key="billing" {...pageTransition}>
            <BillingPage
              onPlaceOrder={handlePlaceOrder}
              onBack={handleBackToMenu}
            />
          </motion.main>
        );
      case "success":
        return (
          <motion.main key="success" {...pageTransition}>
            <OrderSuccess
              orderId={orderId}
              amount={orderAmount}
              onGoHome={handleGoHome}
            />
          </motion.main>
        );
      default:
        return null;
    }
  }, [currentPage, handleExploreMenu, handleBackToMenu, handleProductClick, handlePlaceOrder, orderId, orderAmount, handleGoHome]);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLoyalty={handleOpenLoyalty}
      />

      <AnimatePresence mode="wait">
        {renderPage}
      </AnimatePresence>

      {currentPage !== "success" && <Footer />}

      {/* Global Overlays */}
      <CartDrawer onCheckout={handleCheckout} />
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />
      <LoyaltyCard
        isOpen={loyaltyOpen}
        onClose={handleCloseLoyalty}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <LoyaltyProvider>
          <AppContent />
        </LoyaltyProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
