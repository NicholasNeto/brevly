"use client";

import { motion, AnimatePresence } from "framer-motion";

export function TopLoadingBar({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
       {isLoading && (
        <motion.div
          className="absolute top-0 left-0 h-3px w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full w-1/3 bg-blue-500 rounded-full"
            animate={{ x: ["-100%", "300%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
          />
        </motion.div>
      )} 
    </AnimatePresence>
  );
}
