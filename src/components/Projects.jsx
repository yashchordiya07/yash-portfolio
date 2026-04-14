import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// FEATURE ADDED: Receiving global theme props from App.jsx
const Projects = ({ projects, activeFilter, currentTheme, setCurrentTheme, THEMES }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // NOTE: Local currentTheme and THEMES dictionary have been removed to avoid declaration errors 
  // and ensure the whole page updates when the cube is tapped.

  const timerRef = useRef(null);
  const lastTapRef = useRef(0);
  const themeTimeoutRef = useRef(null);

 const projectData = [
  {
    title: "Email AI Automation System",
    category: "AI / LLM",
    description:
      "OCR + LLM pipeline processing 500+ emails/day with 92% accuracy.",
    tech: ["Python", "FastAPI", "PaddleOCR", "Mistral"],
    keyFeatures: [
      "Automated email parsing",
      "Structured data extraction",
      "Microservice architecture"
    ]
  },
  {
    title: "Time-Series ML Strategy",
    category: "Quant",
    description:
      "Analyzed 10 years of data across 20 assets with ML models.",
    tech: ["Python", "PyTorch", "Scikit-learn"],
    keyFeatures: [
      "27% Sharpe improvement",
      "Walk-forward validation"
    ]
  },
  {
    title: "Churn Prediction System",
    category: "ML",
    description:
      "Built churn + survival models for 7000+ users.",
    tech: ["Python", "Lifelines"],
    keyFeatures: [
      "ROC-AUC 0.86",
      "Survival analysis"
    ]
  }
];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => handleNext(), 3000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % projectData.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + projectData.length) % projectData.length);

  const handleInteractionStart = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // 1. Get the list of theme names from the THEMES prop passed from App.jsx
      const themeKeys = Object.keys(THEMES);
      
      // 2. Calculate the next theme index
      const currentIndexInTheme = themeKeys.indexOf(currentTheme);
      const nextIndex = (currentIndexInTheme + 1) % themeKeys.length;
      const nextTheme = themeKeys[nextIndex];
      
      // 3. Update the Global Theme (triggers whole page color change)
      setCurrentTheme(nextTheme);

      // 4. Handle the 5-minute auto-revert logic
      if (themeTimeoutRef.current) clearTimeout(themeTimeoutRef.current);
      
      if (nextTheme !== 'default') {
        themeTimeoutRef.current = setTimeout(() => {
          setCurrentTheme('default');
        }, 300000); 
      }
    } else {
      handleHoldStart();
    }
    lastTapRef.current = now;
  };

  const handleHoldStart = () => {
    timerRef.current = setTimeout(() => setIsPaused(true), 1500);
  };

  const handleHoldEnd = () => {
    clearTimeout(timerRef.current);
    setIsPaused(false);
  };

  // Helper to make the code cleaner - uses the global props
  const activeTheme = THEMES[currentTheme];

  return (
    <section 
      id="projects" 
      className="transition-all duration-1000 px-6 md:px-12 lg:px-20 py-24 border-t border-white/5 overflow-hidden select-none cursor-pointer"
      style={{ backgroundColor: activeTheme.bg }}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleHoldEnd}
    >
      <style>{`
        .cube-viewport { width: 120px; height: 120px; perspective: 1000px; }
        .cube-body {
          width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
          animation: complexRotate 20s infinite linear;
        }
        .cube-face {
          position: absolute; width: 120px; height: 120px; border: 3px solid #000;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 4px;
          background: #000; box-shadow: inset 0 0 10px rgba(255,255,255,0.1);
        }
        .sticker { 
          width: 100%; height: 100%; border-radius: 4px; 
          box-shadow: inset -2px -2px 5px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.2);
        }
        .front   { transform: translateZ(60px); }
        .back    { transform: rotateY(180deg) translateZ(60px); }
        .right   { transform: rotateY(90deg) translateZ(60px); }
        .left    { transform: rotateY(-90deg) translateZ(60px); }
        .top     { transform: rotateX(90deg) translateZ(60px); }
        .bottom { transform: rotateX(-90deg) translateZ(60px); }
        
        .s-green  { background: #15803d; } 
        .s-orange { background: #ea580c; } 
        .s-blue   { background: #1d4ed8; } 
        .s-red    { background: #b91c1c; } 
        .s-yellow { background: #eab308; } 
        .s-cyan   { background: #0891b2; } 

        @keyframes complexRotate {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg); }
        }
      `}</style>
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="text-left">
          <h2 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-tighter transition-colors duration-500 text-white">
            Technical <span style={{ color: activeTheme.primary }}>Ecosystems</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
            Engineering solutions where raw data meets high-performance execution. My work focuses on 
            <span className="text-white"> optimizing computer vision pipelines</span> and deploying 
            <span style={{ color: activeTheme.primary }}> intelligent automation</span>.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative min-h-112.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
          >
            <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="inline-block px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-colors"
                     style={{ 
                       backgroundColor: `${activeTheme.primary}1A`, 
                       borderColor: `${activeTheme.primary}33`, 
                       color: activeTheme.primary 
                     }}>
                  {projectData[currentIndex].category}
                </div>
                {projectData[currentIndex].organization && (
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-l border-white/20 pl-3">
                    {projectData[currentIndex].organization}
                  </div>
                )}
              </div>
              
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {projectData[currentIndex].title}
              </h3>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                {projectData[currentIndex].description}
              </p>

              {projectData[currentIndex].keyFeatures && (
                <div className="py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: activeTheme.primary }}>Key Highlights</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projectData[currentIndex].keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm font-medium">
                        <span className="mt-1 text-[10px]" style={{ color: activeTheme.primary }}>▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4">
                {projectData[currentIndex].tech.map((t) => (
                  <span key={t} className="px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition-all duration-300"
                        style={activeFilter === t ? { 
                          backgroundColor: activeTheme.primary, 
                          color: '#000', 
                          borderColor: activeTheme.primary 
                        } : { 
                          backgroundColor: '#1a1a1a', 
                          color: '#fff', 
                          borderColor: 'rgba(255,255,255,0.1)' 
                        }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div 
                animate={isPaused ? { scale: 0.85 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-64 h-64 md:w-96 md:h-96 rounded-[4rem] flex items-center justify-center transition-all duration-700 border"
                style={{ backgroundColor: `${activeTheme.primary}0D`, borderColor: `${activeTheme.primary}33` }}
              >
                <div className="cube-viewport">
                  <div className="cube-body">
                    <div className="cube-face front">{Array(9).fill(0).map((_, i)=><div key={i} className="sticker s-green"></div>)}</div>
                    <div className="cube-face back">{Array(9).fill(0).map((_, i)=><div key={i} className="sticker s-blue"></div>)}</div>
                    <div className="cube-face right">{Array(9).fill(0).map((_, i)=><div key={i} className="sticker s-orange"></div>)}</div>
                    <div className="cube-face left">{Array(9).fill(0).map((_, i)=><div key={i} className="sticker s-red"></div>)}</div>
                    <div className="cube-face top">{Array(9).fill(0).map((_, i)=><div key={i} className="sticker s-yellow"></div>)}</div>
                    <div className="cube-face bottom">{Array(9).fill(0).map((_, i)=><div key={i} className="sticker s-cyan"></div>)}</div>
                  </div>
                </div>
                <div className="absolute inset-0 blur-[100px] rounded-full transition-colors duration-1000"
                     style={{ backgroundColor: activeTheme.glow }}></div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-3 mt-16">
        {projectData.map((_, i) => (
          <div 
            key={i} 
            className="h-1.5 rounded-full transition-all duration-500"
            style={i === currentIndex ? { width: '3rem', backgroundColor: activeTheme.primary } : { width: '1rem', backgroundColor: 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;