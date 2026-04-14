import * as Lucide from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FEATURE ADDED: Receiving global theme props from App.jsx
const Certificates = ({ currentTheme, THEMES }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  // Helper to get active colors from props
  const activeTheme = THEMES[currentTheme];

  const Icon = ({ name, ...props }) => {
    const LucidIcon = Lucide[name] || Lucide.Award;
    return <LucidIcon {...props} />;
  };

const displayCerts = [
  {
    title: "NISM Equity Derivatives",
    issuer: "NISM",
    date: "2024",
    image: "Infosys Certificate Aws.jpg"
  },
  {
    title: "NISM Research Analyst",
    issuer: "NISM",
    date: "2025",
    image: "PowerBI.jpg"
  },
  {
    title: "IBM Data Analytics",
    issuer: "IBM",
    date: "2023",
    image: "Infosys Python.jpg"
  },
  {
    title: "TATA GenAI Simulation",
    issuer: "TATA",
    date: "2025",
    image: "lumenore-certificate.jpg"
  }
];

  // Doubling the array ensures a seamless infinite loop animation
  const infiniteCerts = [...displayCerts, ...displayCerts];

  return (
    <section 
      className="transition-all duration-1000 py-20 px-6 md:px-20 text-white border-t border-white/5 overflow-hidden"
      style={{ backgroundColor: activeTheme.bg }}
    >
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
             <span style={{ color: activeTheme.primary }}>Certificates</span>
          </h2>
          <p className="hidden md:block text-white/30 font-bold text-[10px] uppercase tracking-[0.3em]">
             → 
          </p>
        </div>
      </div>
      
      {/* INFINITE CIRCULAR SCROLL CONTAINER */}
      <div className="relative flex overflow-hidden">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 15, 
            repeat: Infinity 
          }}
          whileHover={{ animationPlayState: "paused" }} 
        >
          {infiniteCerts.map((cert, index) => (
            <div 
              key={index} 
              className="flex-none w-72 md:w-96 group flex flex-col"
            >
              {/* THE CERTIFICATE DISPLAY */}
              <div 
                onClick={() => setSelectedImg(cert.image)}
                className="relative aspect-[1.414/1] w-full mb-6 overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] cursor-zoom-in transition-all duration-500"
                style={{ 
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = activeTheme.primary;
                    e.currentTarget.style.boxShadow = `0 0 40px ${activeTheme.glow}`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <div 
                    className="p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300 text-black"
                    style={{ backgroundColor: activeTheme.primary }}
                  >
                    <Icon name="Maximize2" size={24} strokeWidth={3} />
                  </div>
                </div>
                
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* INFO SECTION */}
              <div className="flex items-start justify-between gap-4 px-4">
                <div className="overflow-hidden">
                  <h3 className="font-black text-sm md:text-base uppercase tracking-tight leading-tight mb-2 truncate">
                    {cert.title}
                  </h3>
                  <p 
                    className="font-bold uppercase text-[10px] tracking-widest opacity-80"
                    style={{ color: activeTheme.primary }}
                  >
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <Icon name="BadgeCheck" style={{ color: activeTheme.primary }} size={22} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Side Gradients for smooth fading look */}
        <div 
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${activeTheme.bg}, transparent)` }}
        ></div>
        <div 
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${activeTheme.bg}, transparent)` }}
        ></div>
      </div>

      {/* MEDIUM VIEW MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Close Button Inside Modal */}
              <button 
                className="absolute top-4 right-4 text-white/50 z-50 p-2 bg-black/50 rounded-full transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = activeTheme.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                onClick={() => setSelectedImg(null)}
              >
                <Icon name="X" size={24} />
              </button>

              <img 
                src={selectedImg} 
                alt="Certificate View" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Certificates;