// Compact Version: Black theme with Indigo & White text — No hover shadows on video
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const projects = [
  {
    title: 'Dispersion 2025 Cannes',
    imageSrc: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: "Dominic's Purse",
    imageSrc: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Volatile',
    highlight: true,
    description: `Tired of same repeated concepts about overpowered massy hero kinda stories...
Try something new. Try something unique.
Try something VOLATILE!

12 stories. 12 realities. One volatile truth!
An AI-animated anthology series produced by IndieRise Research Labs, written and directed by 5 emerging filmmakers.

"Is Artificial Intelligence truly VOLATILE?"

Coming soon... 🎬`,
    videoSrc: '/AnnouncementTeaserFinalCut.mp4',
    imageSrc: null,
  },
  {
    title: 'Project X',
    imageSrc: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Upcoming Film 1',
    imageSrc: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Upcoming Film 2',
    imageSrc: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const cardVariants = {
  enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }),
};

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-black">
          <video
            src={project.videoSrc}
            controls autoPlay
            className="w-full h-[300px] object-contain"
          />
        </div>
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-bold text-indigo-400 mb-3">{project.title}</h2>
          <p className="whitespace-pre-wrap text-white leading-relaxed text-sm">{project.description}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-indigo-600 hover:bg-indigo-500 w-9 h-9 rounded-full flex items-center justify-center"
        >
          <X size={20} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [showModal, setShowModal] = useState(false);
  const projectIndex = (page % projects.length + projects.length) % projects.length;
  const activeProject = projects[projectIndex];

  const paginate = (newDirection) => setPage([page + newDirection, newDirection]);
  const handleOpenModal = () => activeProject.videoSrc && setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="relative w-full min-h-screen bg-black py-12 px-4 text-white flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        key={projectIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.5 } }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-black via-indigo-900/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-white">Stories We've Brought to Life</h2>
        <p className="text-base text-indigo-300 text-center mb-10 max-w-xl">
          Explore our portfolio. Each project is a unique world crafted with passion and innovation.
        </p>

        <div className="relative w-full h-[380px] max-w-2xl flex items-center justify-center">
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-[90%] h-[360px] md:w-full md:h-full cursor-pointer"
              onClick={handleOpenModal}
            >
              <div className="w-full h-full bg-black rounded-2xl shadow-xl overflow-hidden relative border border-white/10">
                {activeProject.imageSrc ? (
                  <img src={activeProject.imageSrc} alt={activeProject.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <h3 className="text-2xl font-bold text-indigo-500">VOLATILE</h3>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                {activeProject.highlight && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border border-white rounded-full w-20 h-20 flex items-center justify-center pointer-events-none bg-white/10 backdrop-blur-sm">
                      <p className="text-sm text-white">WATCH</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className="mt-8 text-center w-full max-w-xl h-28">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={projectIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
              exit={{ y: -20, opacity: 0, transition: { duration: 0.2 } }}
            >
              <h3 className={`text-2xl font-bold ${activeProject.highlight ? 'text-indigo-400' : 'text-white'}`}>
                {activeProject.title}
              </h3>
              {activeProject.highlight && (
                <p className="mt-1 text-sm text-white">An AI-animated anthology series. Click the card to watch the teaser.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showModal && <ProjectModal project={activeProject} onClose={handleCloseModal} />}
      </AnimatePresence>
    </section>
  );
}