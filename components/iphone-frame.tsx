"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
  color?: string;
}

interface BackgroundHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface IPhoneFrameProps {
  onLongPress: () => void;
}

export function IPhoneFrame({ onLongPress }: IPhoneFrameProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images for the iPhone frame
  const coupleImages = [
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop",
  ];

  // Device shake detection
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    const threshold = 15;

    const handleMotion = (event: DeviceMotionEvent) => {
      const { accelerationIncludingGravity } = event;
      if (!accelerationIncludingGravity) return;

      const { x, y, z } = accelerationIncludingGravity;
      const deltaX = Math.abs((x || 0) - lastX);
      const deltaY = Math.abs((y || 0) - lastY);
      const deltaZ = Math.abs((z || 0) - lastZ);

      if (deltaX + deltaY + deltaZ > threshold) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }

      lastX = x || 0;
      lastY = y || 0;
      lastZ = z || 0;
    };

    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, []);

  const handlePressStart = () => {
    setIsVibrating(true);
    
    // Vibrate if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }

    const timer = setTimeout(() => {
      onLongPress();
    }, 3000);
    
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    setIsVibrating(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const handleClick = () => {
    setCurrentImageIndex((prev) => (prev + 1) % coupleImages.length);
    
    // Vibrate on click
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  return (
    <motion.div
      className="relative"
      animate={{
        rotate: isShaking ? [0, -3, 3, -3, 3, 0] : 0,
        scale: isVibrating ? [1, 0.98, 1.02, 0.98, 1] : 1,
      }}
      transition={{
        duration: isShaking ? 0.5 : 0.15,
        repeat: isVibrating ? Infinity : 0,
      }}
    >
      {/* iPhone frame */}
      <motion.div
        className="relative w-56 h-[400px] rounded-[40px] p-2 cursor-pointer"
        style={{
          background: "linear-gradient(145deg, #1a1a2e, #16213e)",
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            inset 0 1px 1px rgba(255, 255, 255, 0.1),
            0 0 60px -20px rgba(236, 72, 153, 0.3)
          `,
        }}
        onClick={handleClick}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Screen border */}
        <div className="absolute inset-2 rounded-[32px] overflow-hidden border-2 border-gray-800">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />

          {/* Screen content */}
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-pink-500/20 to-sky-500/20">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={coupleImages[currentImageIndex]}
                alt="Our memory"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Heart overlay */}
            <motion.div
              className="absolute bottom-4 right-4 text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💕
            </motion.div>
          </div>
        </div>

        {/* Side button */}
        <div className="absolute right-[-2px] top-24 w-1 h-16 bg-gray-700 rounded-l-sm" />
        
        {/* Volume buttons */}
        <div className="absolute left-[-2px] top-20 w-1 h-8 bg-gray-700 rounded-r-sm" />
        <div className="absolute left-[-2px] top-32 w-1 h-8 bg-gray-700 rounded-r-sm" />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-[40px] pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: [-200, 300],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-sky-500" />
      </div>

      {/* Press indicator */}
      <AnimatePresence>
        {isVibrating && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-pink-300/60 whitespace-nowrap"
          >
            Tahan 3 detik untuk reset...
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// SVG Icon components for falling elements
const HeartIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const SparkleIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"/>
  </svg>
);

const StarIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

const DoubleHeartIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
  </svg>
);

const FlowerIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
    <path d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z"/>
    <path d="M4 12C4 10.9 4.9 10 6 10C7.1 10 8 10.9 8 12C8 13.1 7.1 14 6 14C4.9 14 4 13.1 4 12Z"/>
    <path d="M18 10C19.1 10 20 10.9 20 12C20 13.1 19.1 14 18 14C16.9 14 16 13.1 16 12C16 10.9 16.9 10 18 10Z"/>
    <path d="M6.34 6.34C7.12 5.56 8.39 5.56 9.17 6.34C9.95 7.12 9.95 8.39 9.17 9.17C8.39 9.95 7.12 9.95 6.34 9.17C5.56 8.39 5.56 7.12 6.34 6.34Z"/>
    <path d="M14.83 14.83C15.61 14.05 16.88 14.05 17.66 14.83C18.44 15.61 18.44 16.88 17.66 17.66C16.88 18.44 15.61 18.44 14.83 17.66C14.05 16.88 14.05 15.61 14.83 14.83Z"/>
    <path d="M14.83 6.34C15.61 7.12 15.61 8.39 14.83 9.17C14.05 9.95 12.78 9.95 12 9.17C12.78 8.39 14.05 5.56 14.83 6.34Z"/>
    <path d="M6.34 14.83C7.12 15.61 7.12 16.88 6.34 17.66C5.56 18.44 4.29 18.44 3.51 17.66C4.29 16.88 5.56 14.05 6.34 14.83Z"/>
  </svg>
);

// Falling hearts component
export function FallingHearts() {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    const iconTypes = ["heart", "sparkle", "star", "doubleHeart", "flower"];
    const colors = [
      "rgba(236, 72, 153, 0.7)",   // pink-500
      "rgba(244, 114, 182, 0.6)",  // pink-400
      "rgba(251, 207, 232, 0.5)",  // pink-200
      "rgba(125, 211, 252, 0.6)",  // sky-300
      "rgba(186, 230, 253, 0.5)",  // sky-200
    ];
    
    const initialHearts: FallingHeart[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 14 + Math.random() * 12,
      emoji: iconTypes[Math.floor(Math.random() * iconTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setHearts(initialHearts);
  }, []);

  const renderIcon = (type: string, size: number, color: string) => {
    switch (type) {
      case "heart":
        return <HeartIcon size={size} color={color} />;
      case "sparkle":
        return <SparkleIcon size={size} color={color} />;
      case "star":
        return <StarIcon size={size} color={color} />;
      case "doubleHeart":
        return <DoubleHeartIcon size={size} color={color} />;
      case "flower":
        return <FlowerIcon size={size} color={color} />;
      default:
        return <HeartIcon size={size} color={color} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
          }}
          initial={{ y: -50, opacity: 0.7, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0.7, 0.5, 0.3, 0],
            rotate: 180,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {renderIcon(heart.emoji, heart.size, heart.color || "rgba(236, 72, 153, 0.7)")}
        </motion.div>
      ))}
    </div>
  );
}

// Exploding background hearts
export function BackgroundHearts() {
  const [hearts, setHearts] = useState<BackgroundHeart[]>([]);
  const [explodingId, setExplodingId] = useState<number | null>(null);

  useEffect(() => {
    const initialHearts: BackgroundHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      size: 20 + Math.random() * 30,
      opacity: 0.05 + Math.random() * 0.1,
    }));
    setHearts(initialHearts);
  }, []);

  const handleHeartClick = useCallback((id: number) => {
    setExplodingId(id);
    
    // Vibrate
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
      setExplodingId(null);

      // Respawn heart after a delay
      setTimeout(() => {
        setHearts((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: 10 + Math.random() * 80,
            y: 15 + Math.random() * 70,
            size: 20 + Math.random() * 30,
            opacity: 0.05 + Math.random() * 0.1,
          },
        ]);
      }, 2000);
    }, 500);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.button
          key={heart.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          onClick={() => handleHeartClick(heart.id)}
          whileHover={{ scale: 1.2, opacity: 0.3 }}
          animate={
            explodingId === heart.id
              ? {
                  scale: [1, 2, 3],
                  opacity: [heart.opacity, 0.5, 0],
                  rotate: [0, 180, 360],
                }
              : {
                  y: [0, -10, 0],
                }
          }
          transition={
            explodingId === heart.id
              ? { duration: 0.5 }
              : {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          💕
        </motion.button>
      ))}
    </div>
  );
}
