"use client";

import { motion } from "framer-motion";

interface TopLoadingBarProps {
  isLoading: boolean;
}

export function TopLoadingBar({ isLoading }: TopLoadingBarProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="absolute top-0 left-0 h-[3px] w-full"
      initial={{ backgroundPositionX: "0%" }}
      animate={{ backgroundPositionX: "100%" }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, #6366f1, transparent)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}