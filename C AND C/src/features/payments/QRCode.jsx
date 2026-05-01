import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

export default function QRCode({ amount, orderId }) {
  const paymentUrl = `upi://pay?pa=cupandcozy@upi&pn=Cup%20%26%20Cozy&am=${amount}&cu=INR&tn=Order%20${orderId}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col items-center"
    >
      <div className="bg-white p-6 rounded-2xl card-shadow">
        <QRCodeSVG
          value={paymentUrl}
          size={200}
          bgColor="#ffffff"
          fgColor="#7c2d12"
          level="M"
          includeMargin={false}
        />
      </div>
      <p className="text-text-light text-sm mt-4 text-center">
        Scan with any UPI app to pay
      </p>
      <p className="text-accent font-bold text-xl mt-2">₹{amount}</p>
    </motion.div>
  );
}
