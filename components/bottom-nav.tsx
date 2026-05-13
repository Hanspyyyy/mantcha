"use client";

import { motion } from "framer-motion";
import { Home, Images, Gamepad2 } from "lucide-react";

type TabType = "home" | "gallery" | "game";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDark: boolean;
}

export function BottomNav({ activeTab, onTabChange, isDark }: BottomNavProps) {
  const tabs: { id: TabType; icon: typeof Home; label: string }[] = [
    { id: "gallery", icon: Images, label: "Gallery" },
    { id: "home", icon: Home, label: "Home" },
    { id: "game", icon: Gamepad2, label: "Game" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pb-safe">
      <div className="max-w-md mx-auto px-4 pb-4">
        {/* Main navbar */}
        <motion.div
          className={`relative flex items-center justify-around py-3 px-2 rounded-[32px] backdrop-blur-xl border shadow-lg ${
            isDark
              ? "bg-gradient-to-r from-pink-500/90 via-pink-400/90 to-pink-500/90 border-pink-300/30"
              : "bg-gradient-to-r from-sky-400/80 via-sky-300/80 to-sky-400/80 border-sky-200/50"
          }`}
          style={{
            boxShadow: isDark
              ? "0 -10px 40px -10px rgba(236, 72, 153, 0.3)"
              : "0 -10px 40px -10px rgba(56, 189, 248, 0.25)",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center w-20 h-12 rounded-2xl transition-all"
                whileTap={{ scale: 0.9 }}
              >
                {/* Clear/neutral bubble overlay when active */}
                {isActive && (
                  <motion.div
                    layoutId="activeBubble"
                    className={`absolute inset-0 rounded-2xl ${
                      isDark
                        ? "bg-white/20 border border-white/30"
                        : "bg-white/40 border border-white/50"
                    }`}
                    style={{
                      backdropFilter: "blur(4px)",
                      boxShadow: isDark
                        ? "0 4px 15px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
                        : "0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <motion.div
                  className="relative z-10 flex flex-col items-center"
                  animate={{
                    y: isActive ? -1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Icon
                    className={`w-5 h-5 mb-1 transition-colors ${
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-sky-700"
                        : isDark
                        ? "text-pink-100/70"
                        : "text-sky-600/70"
                    }`}
                  />
                  <span
                    className={`text-xs transition-colors ${
                      isActive
                        ? isDark
                          ? "text-white font-medium"
                          : "text-sky-700 font-medium"
                        : isDark
                        ? "text-pink-100/70"
                        : "text-sky-600/70"
                    }`}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
