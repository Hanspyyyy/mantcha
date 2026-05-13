"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop",
    title: "Sweet Moment",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=400&fit=crop",
    title: "Together",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=400&fit=crop",
    title: "Our Day",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
    title: "Happiness",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
    title: "Love Story",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop",
    title: "Forever",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
    title: "Beautiful",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    title: "Memory",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    title: "Smile",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    title: "Joy",
  },
];

export function GalleryView() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-sky-300 bg-clip-text text-transparent">
          📸 Our Gallery
        </h2>
        <p className="text-pink-300/60 text-sm mt-1">Tap to view full size</p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 max-w-md mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl ${
              index % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
            }`}
            style={{
              boxShadow: "0 4px 20px rgba(236, 72, 153, 0.2)",
            }}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-sky-500/20"
            />
            <p className="absolute bottom-2 left-2 text-white text-sm font-medium">
              {image.title}
            </p>
            <motion.div
              className="absolute top-2 right-2 text-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Full screen image viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
              >
                <p className="text-white font-medium text-lg">{selectedImage.title}</p>
                <p className="text-pink-300/80 text-sm">Our beautiful memory 💕</p>
              </motion.div>
            </motion.div>

            {/* Floating hearts decoration */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl pointer-events-none"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                💕
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
