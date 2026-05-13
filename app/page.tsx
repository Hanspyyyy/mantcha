"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroScreen } from "@/components/intro-screen";
import { TopNav } from "@/components/top-nav";
import { BottomNav } from "@/components/bottom-nav";
import { HomeView } from "@/components/home-view";
import { GalleryView } from "@/components/gallery-view";
import { GameView } from "@/components/game-view";

type TabType = "home" | "gallery" | "game";

export default function MantchaApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isDark, setIsDark] = useState(true);

  // Apply theme class to HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("light");
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  }, [isDark]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowIntro(true);
      setIsLoading(false);
    }, 500);
  };

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Intro Screen */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Loading overlay for reset */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              💕
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      {!showIntro && (
        <>
          {/* Top Navigation */}
          <TopNav isDark={isDark} onToggleTheme={handleToggleTheme} />

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <HomeView onReset={handleReset} />
              </motion.div>
            )}
            {activeTab === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryView />
              </motion.div>
            )}
            {activeTab === "game" && (
              <motion.div
                key="game"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <GameView />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />

          {/* Background gradient overlay */}
          <div className="fixed inset-0 pointer-events-none z-[-1]">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: isDark 
                  ? "radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 40%)"
                  : "radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(56, 189, 248, 0.08) 0%, transparent 40%)"
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
