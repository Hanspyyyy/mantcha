"use client";

import { motion } from "framer-motion";
import { Gamepad2, Heart, Sparkles, Star, ExternalLink } from "lucide-react";

const games = [
  {
    id: 1,
    title: "Love Quiz",
    description: "Test how well you know each other!",
    icon: "💕",
    color: "from-pink-500 to-rose-500",
    link: "#",
  },
  {
    id: 2,
    title: "Memory Match",
    description: "Match our photos together",
    icon: "🎴",
    color: "from-sky-500 to-blue-500",
    link: "#",
  },
  {
    id: 3,
    title: "Love Letter",
    description: "Write secret messages",
    icon: "💌",
    color: "from-pink-400 to-purple-500",
    link: "#",
  },
  {
    id: 4,
    title: "Couple Challenge",
    description: "Fun challenges for us",
    icon: "🎯",
    color: "from-amber-500 to-orange-500",
    link: "#",
  },
];

export function GameView() {
  const handleGameClick = (link: string) => {
    // For now, just show alert since games are external
    if (link === "#") {
      return;
    }
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-2"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Gamepad2 className="w-8 h-8 text-pink-400" />
        </motion.div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-sky-300 bg-clip-text text-transparent">
          🎮 Game Zone
        </h2>
        <p className="text-pink-300/60 text-sm mt-1">Fun games for couples!</p>
      </motion.div>

      {/* Games Grid */}
      <motion.div
        className="grid gap-4 max-w-md mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {games.map((game, index) => (
          <motion.button
            key={game.id}
            variants={{
              hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
              visible: { opacity: 1, x: 0 },
            }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGameClick(game.link)}
            className="relative w-full p-4 rounded-2xl overflow-hidden text-left"
            style={{
              background: "linear-gradient(135deg, rgba(30, 30, 50, 0.8), rgba(40, 40, 70, 0.8))",
              boxShadow: "0 4px 20px rgba(236, 72, 153, 0.15)",
            }}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 opacity-20 bg-gradient-to-r ${game.color}`}
            />

            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {game.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-pink-200">{game.title}</h3>
                <p className="text-sm text-pink-300/60">{game.description}</p>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-5 h-5 text-pink-400" />
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-2 right-2 text-sm opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
          </motion.button>
        ))}
      </motion.div>

      {/* Coming soon section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 max-w-md mx-auto"
      >
        <div className="p-6 rounded-3xl text-center border border-dashed border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-sky-500/5">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-3"
          >
            <Sparkles className="w-8 h-8 text-pink-400" />
          </motion.div>
          <h3 className="text-lg font-bold text-pink-200 mb-2">More Games Coming Soon!</h3>
          <p className="text-sm text-pink-300/60">
            Stay tuned for more fun activities we can do together 💕
          </p>

          {/* Animated icons */}
          <div className="flex justify-center gap-4 mt-4">
            {[Heart, Star, Sparkles].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Icon className="w-5 h-5 text-pink-400/50" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-pink-300/40 mt-6"
      >
        Games will open in a new window
      </motion.p>
    </div>
  );
}
