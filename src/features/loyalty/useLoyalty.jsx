import { createContext, useContext, useState, useCallback, useMemo } from "react";

const LoyaltyContext = createContext(null);

const MAX_STAMPS = 9;

export function LoyaltyProvider({ children }) {
  const [stamps, setStamps] = useState(() => {
    const stored = localStorage.getItem("cupcozy-stamps");
    return stored ? parseInt(stored, 10) : 0;
  });

  const [showReward, setShowReward] = useState(false);

  const addStamp = useCallback(() => {
    setStamps((prev) => {
      const next = prev + 1;
      if (next >= MAX_STAMPS) {
        setShowReward(true);
        localStorage.setItem("cupcozy-stamps", "0");
        return MAX_STAMPS;
      }
      localStorage.setItem("cupcozy-stamps", String(next));
      return next;
    });
  }, []);

  const claimReward = useCallback(() => {
    setStamps(0);
    setShowReward(false);
    localStorage.setItem("cupcozy-stamps", "0");
  }, []);

  const value = useMemo(
    () => ({ stamps, maxStamps: MAX_STAMPS, showReward, addStamp, claimReward }),
    [stamps, showReward, addStamp, claimReward]
  );

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error("useLoyalty must be used within LoyaltyProvider");
  return context;
}

export default useLoyalty;
