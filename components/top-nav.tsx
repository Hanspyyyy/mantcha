"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, Music, Pause, ChevronRight, X } from "lucide-react";

interface TopNavProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const songs = [
  { id: 1, title: "Bergema Sampai Selamanya", artist: "Love Song" },
  { id: 2, title: "Perempuan Yang Sedang Di Pelukan", artist: "Romantic" },
  { id: 3, title: "Surat Cinta Untuk Starla", artist: "Virgoun" },
];

export function TopNav({ isDark, onToggleTheme }: TopNavProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showSongList, setShowSongList] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element (using a placeholder since we don't have actual audio files)
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, this would play/pause the audio
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setShowSongList(false);
    setIsPlaying(true);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 px-4 py-3"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-sky-500/20 backdrop-blur-md border border-pink-500/30"
          >
            <Menu className="w-5 h-5 text-pink-300" />
          </motion.button>

          {/* Logo / Music Player */}
          <motion.div
            className="flex items-center gap-2"
            layout
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="music"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-sky-500/20 backdrop-blur-md border border-pink-500/30"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-lg"
                  >
                    💿
                  </motion.div>
                  <div className="max-w-[120px]">
                    <p className="text-xs text-pink-300 truncate font-medium">
                      {songs[currentSongIndex].title}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-pink-400 to-sky-400 rounded-full"
                          animate={{ height: [4, 12, 4] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={togglePlay}
                    className="p-1"
                  >
                    <Pause className="w-4 h-4 text-pink-300" />
                  </button>
                  <button 
                    onClick={() => setShowSongList(true)}
                    className="p-1"
                  >
                    <ChevronRight className="w-4 h-4 text-pink-300" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-sky-500/20 backdrop-blur-md border border-pink-500/30"
                >
                  <span className="text-lg font-bold bg-gradient-to-r from-pink-400 to-sky-300 bg-clip-text text-transparent">
                    Mantcha
                  </span>
                  <Music className="w-4 h-4 text-pink-300" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-sky-500/20 backdrop-blur-md border border-pink-500/30"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-sky-300" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Song list modal */}
      <AnimatePresence>
        {showSongList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSongList(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-80 p-4 rounded-3xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-pink-500/30 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-pink-300">🎵 Pilih Lagu</h3>
                <button onClick={() => setShowSongList(false)}>
                  <X className="w-5 h-5 text-pink-300" />
                </button>
              </div>
              <div className="space-y-2">
                {songs.map((song, index) => (
                  <motion.button
                    key={song.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectSong(index)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      currentSongIndex === index
                        ? "bg-gradient-to-r from-pink-500/30 to-sky-500/30 border border-pink-500/50"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="font-medium text-pink-200">{song.title}</p>
                    <p className="text-xs text-pink-300/60">{song.artist}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-gradient-to-br from-gray-900/98 to-gray-800/98 border-r border-pink-500/30 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-sky-300 bg-clip-text text-transparent">
                  Mantcha
                </h2>
                <button onClick={() => setShowMenu(false)}>
                  <X className="w-6 h-6 text-pink-300" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 to-sky-500/10 border border-pink-500/20">
                  <p className="text-pink-200 text-sm">💕 Welcome back!</p>
                  <p className="text-pink-300/60 text-xs mt-1">
                    Your love story continues...
                  </p>
                </div>

                <div className="pt-4 border-t border-pink-500/20">
                  <p className="text-xs text-pink-300/40 mb-2">THEME</p>
                  <button
                    onClick={onToggleTheme}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-5 h-5 text-yellow-300" />
                        <span className="text-pink-200">Mode Terang</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-sky-300" />
                        <span className="text-pink-200">Mode Gelap</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 border-t border-pink-500/20">
                  <p className="text-xs text-pink-300/40 mb-2">MUSIK</p>
                  {songs.map((song, index) => (
                    <button
                      key={song.id}
                      onClick={() => {
                        selectSong(index);
                        setShowMenu(false);
                      }}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${
                        currentSongIndex === index && isPlaying
                          ? "bg-pink-500/20"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span className="text-lg">🎵</span>
                      <div className="text-left">
                        <p className="text-sm text-pink-200">{song.title}</p>
                        <p className="text-xs text-pink-300/60">{song.artist}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-center text-xs text-pink-300/40">
                  Made with 💕 for us
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
