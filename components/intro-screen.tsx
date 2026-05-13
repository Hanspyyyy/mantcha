"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
}

// Animated cat SVG component
function Cat({ x, y }: { x: number; y: number }) {
  return (
    <motion.svg
      className="absolute w-12 h-12"
      viewBox="0 0 64 64"
      animate={{
        x: x,
        y: y,
        rotate: [0, -10, 10, 0],
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {/* Cat body */}
      <ellipse cx="32" cy="42" rx="16" ry="12" fill="#f8b4d9" />
      {/* Cat head */}
      <circle cx="32" cy="26" r="14" fill="#f8b4d9" />
      {/* Left ear */}
      <polygon points="20,18 24,8 28,18" fill="#f8b4d9" />
      <polygon points="22,16 24,11 26,16" fill="#fce7f3" />
      {/* Right ear */}
      <polygon points="36,18 40,8 44,18" fill="#f8b4d9" />
      <polygon points="38,16 40,11 42,16" fill="#fce7f3" />
      {/* Eyes */}
      <ellipse cx="27" cy="24" rx="3" ry="4" fill="#1f2937" />
      <ellipse cx="37" cy="24" rx="3" ry="4" fill="#1f2937" />
      <circle cx="26" cy="23" r="1" fill="#fff" />
      <circle cx="36" cy="23" r="1" fill="#fff" />
      {/* Nose */}
      <ellipse cx="32" cy="30" rx="2" ry="1.5" fill="#ec4899" />
      {/* Mouth */}
      <path d="M30 32 Q32 35 34 32" stroke="#ec4899" strokeWidth="1" fill="none" />
      {/* Whiskers */}
      <line x1="18" y1="28" x2="26" y2="30" stroke="#9ca3af" strokeWidth="0.5" />
      <line x1="18" y1="32" x2="26" y2="32" stroke="#9ca3af" strokeWidth="0.5" />
      <line x1="46" y1="28" x2="38" y2="30" stroke="#9ca3af" strokeWidth="0.5" />
      <line x1="46" y1="32" x2="38" y2="32" stroke="#9ca3af" strokeWidth="0.5" />
      {/* Tail */}
      <motion.path
        d="M48 42 Q60 35 55 50"
        stroke="#f8b4d9"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M48 42 Q60 35 55 50", "M48 42 Q65 40 58 48", "M48 42 Q60 35 55 50"] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Animated dog SVG component
function Dog({ x, y }: { x: number; y: number }) {
  return (
    <motion.svg
      className="absolute w-14 h-14"
      viewBox="0 0 64 64"
      animate={{
        x: x - 80,
        y: y,
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.1,
      }}
    >
      {/* Dog body */}
      <ellipse cx="32" cy="44" rx="18" ry="12" fill="#7dd3fc" />
      {/* Dog head */}
      <circle cx="32" cy="26" r="15" fill="#7dd3fc" />
      {/* Left ear (floppy) */}
      <ellipse cx="18" cy="20" rx="6" ry="10" fill="#38bdf8" />
      {/* Right ear (floppy) */}
      <ellipse cx="46" cy="20" rx="6" ry="10" fill="#38bdf8" />
      {/* Snout */}
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#e0f2fe" />
      {/* Eyes */}
      <circle cx="26" cy="24" r="4" fill="#1f2937" />
      <circle cx="38" cy="24" r="4" fill="#1f2937" />
      <circle cx="25" cy="23" r="1.5" fill="#fff" />
      <circle cx="37" cy="23" r="1.5" fill="#fff" />
      {/* Nose */}
      <ellipse cx="32" cy="30" rx="3" ry="2.5" fill="#1f2937" />
      <ellipse cx="31" cy="29" rx="1" ry="0.5" fill="#4b5563" />
      {/* Mouth */}
      <path d="M28 34 Q32 38 36 34" stroke="#64748b" strokeWidth="1.5" fill="none" />
      {/* Tongue */}
      <motion.ellipse
        cx="32"
        cy="37"
        rx="3"
        ry="4"
        fill="#f472b6"
        animate={{ ry: [4, 5, 4] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      {/* Tail */}
      <motion.path
        d="M50 44 Q60 38 58 50"
        stroke="#7dd3fc"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M50 44 Q60 38 58 50", "M50 44 Q65 32 62 45", "M50 44 Q60 38 58 50"] }}
        transition={{ duration: 0.2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Paw print SVG
function PawPrint({ style }: { style: React.CSSProperties }) {
  return (
    <motion.svg
      className="absolute w-6 h-6 text-pink-300/30"
      viewBox="0 0 24 24"
      fill="currentColor"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1, 0.8] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      style={style}
    >
      <ellipse cx="12" cy="17" rx="5" ry="4" />
      <circle cx="7" cy="10" r="2.5" />
      <circle cx="17" cy="10" r="2.5" />
      <circle cx="5" cy="14" r="2" />
      <circle cx="19" cy="14" r="2" />
    </motion.svg>
  );
}

// Heart SVG
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Sparkle SVG
function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" />
    </svg>
  );
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const [catPosition, setCatPosition] = useState({ x: 50, y: 200 });
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Animate cat and dog chase
    const moveInterval = setInterval(() => {
      setCatPosition(prev => {
        const newX = prev.x + Math.random() * 100 - 25;
        const newY = prev.y + Math.random() * 60 - 30;
        return {
          x: Math.max(50, Math.min(250, newX)),
          y: Math.max(150, Math.min(350, newY)),
        };
      });
    }, 800);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(moveInterval);
          setTimeout(() => setShowText(true), 200);
          setTimeout(onComplete, 2500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(moveInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
      }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating hearts and sparkles background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          initial={{
            x: Math.random() * 400 - 50,
            y: -50,
          }}
          animate={{
            y: 600,
            rotate: 360,
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {i % 2 === 0 ? (
            <HeartIcon className="w-6 h-6 text-pink-400" />
          ) : (
            <Sparkle className="w-5 h-5 text-sky-300" />
          )}
        </motion.div>
      ))}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-sky-300 bg-clip-text text-transparent">
          Mantcha
        </h1>
        <p className="text-center text-pink-200/60 text-sm mt-2">Loading our memories...</p>
      </motion.div>

      {/* Chase animation area */}
      <div className="relative w-80 h-40 mb-8 bg-gradient-to-br from-pink-500/10 to-sky-500/10 rounded-3xl border border-pink-500/20 overflow-hidden">
        <Cat x={catPosition.x} y={catPosition.y - 150} />
        <Dog x={catPosition.x} y={catPosition.y - 150} />
        
        {/* Paw prints */}
        {[...Array(5)].map((_, i) => (
          <PawPrint
            key={i}
            style={{
              left: 30 + i * 50,
              top: 80 + (i % 2) * 20,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #f472b6, #7dd3fc)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <p className="text-pink-200/60 text-sm">{progress}%</p>

      {/* Welcome text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 text-center flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <HeartIcon className="w-5 h-5 text-pink-400" />
              <span className="text-2xl text-pink-300">Welcome, Sayang!</span>
              <HeartIcon className="w-5 h-5 text-pink-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
