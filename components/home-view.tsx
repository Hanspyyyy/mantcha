"use client";

import { motion } from "framer-motion";
import { IPhoneFrame, FallingHearts, BackgroundHearts } from "./iphone-frame";

interface HomeViewProps {
  onReset: () => void;
}

export function HomeView({ onReset }: HomeViewProps) {
  return (
    <div className="min-h-screen pt-20 pb-32 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Falling hearts */}
      <FallingHearts />
      
      {/* Background hearts (clickable) */}
      <BackgroundHearts />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center"
      >
        {/* Welcome text */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-sky-300 bg-clip-text text-transparent mb-2"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Welcome, Sayang! 💕
          </motion.h1>
          <p className="text-pink-300/60 text-sm">Our memories together</p>
        </motion.div>

        {/* iPhone Frame */}
        <IPhoneFrame onLongPress={onReset} />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center max-w-xs"
        >
          <p className="text-pink-300/50 text-xs">
            💡 Tap frame to see more photos • Shake phone to animate • Long press for 3s to reset
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-6xl opacity-20 blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          💕
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute top-1/4 left-4 text-2xl opacity-30">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌸
        </motion.div>
      </div>
      <div className="absolute top-1/3 right-4 text-2xl opacity-30">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </div>
      <div className="absolute bottom-1/4 left-8 text-xl opacity-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💫
        </motion.div>
      </div>
      <div className="absolute bottom-1/3 right-8 text-xl opacity-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🌙
        </motion.div>
      </div>
    </div>
  );
}
