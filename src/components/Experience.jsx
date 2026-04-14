import { Award, GraduationCap, ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// FEATURE ADDED: Receiving global theme props from App.jsx
const Experience = ({ currentTheme, THEMES }) => {
  // Data derived from your professional history
  const experiences = [
  {
    role: "AI Engineer",
    company: "Ashoka Buildcon Ltd",
    location: "Nashik, India",
    duration: "Dec 2025 – Apr 2026",
    description:
      "Built AI email automation system processing 500+ emails/day using OCR + LLM pipeline. Achieved ~92% accuracy and reduced manual work by 70%."
  },
  {
    role: "Algo Trader",
    company: "Utilized Ltd",
    location: "Remote",
    duration: "Nov 2024 – Apr 2025",
    description:
      "Developed short straddle strategy (~20% CAGR, 1.3 Sharpe) and crypto arbitrage systems."
  }
];

const education = [
  {
    institution: "KK Wagh Institute of Engineering",
    degree: "BTech AI & Data Science",
    year: "2022 – 2026",
    score: "7.75 CGPA"
  },
  {
    institution: "Ambrosia College",
    degree: "Class 12",
    year: "2020 – 2022",
    score: "77.33%"
  },
  {
    institution: "Horizon Academy",
    degree: "Class 10",
    year: "2019",
    score: "87.5%"
  }
];

  // Helper to get active colors from props
  const activeTheme = THEMES[currentTheme];

  // Animation Variants for the "Atomic" assembly/disassembly
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  // Atoms flying in from the left (Experience)
  const leftAtom = {
    hidden: { x: -150, opacity: 0, scale: 0.5, filter: "blur(10px)" },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 20, stiffness: 100 } 
    }
  };

  // Atoms flying in from the right (Education)
  const rightAtom = {
    hidden: { x: 150, opacity: 0, scale: 0.5, filter: "blur(10px)" },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 20, stiffness: 100 } 
    }
  };

  return (
    <section 
      id="experience" 
      className="transition-all duration-1000 px-6 md:px-12 lg:px-20 py-20 md:py-32 border-t border-white/5 overflow-hidden"
      style={{ backgroundColor: activeTheme.bg }}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
      >
        
        {/* --- Experience Column (Left Atoms) --- */}
        <div className="w-full">
          <motion.div variants={leftAtom} className="flex items-center gap-4 mb-12">
            <div 
              className="p-3 bg-black rounded-2xl border transition-all duration-500"
              style={{ borderColor: `${activeTheme.primary}33`, boxShadow: `0 0 15px ${activeTheme.glow}` }}
            >
              <Award style={{ color: activeTheme.primary }} size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
              Professional <span style={{ color: activeTheme.primary }}>Experience</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {experiences.map((job, i) => (
              <motion.div 
                key={i} 
                variants={leftAtom}
                className="relative pl-10 border-l-2 border-white/5 group"
              >
                <div 
                  className="absolute w-4 h-4 rounded-full -left-2.25 top-1 transition-all duration-500 group-hover:scale-150"
                  style={{ backgroundColor: activeTheme.primary, boxShadow: `0 0 20px ${activeTheme.primary}` }}
                ></div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 
                    className="text-xl md:text-2xl font-bold text-white transition-colors"
                    onMouseEnter={(e) => e.target.style.color = activeTheme.primary}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    {job.role}
                  </h3>
                  <span 
                    className="px-3 py-1 text-[10px] font-black uppercase rounded-lg border transition-all duration-500"
                    style={{ backgroundColor: `${activeTheme.primary}1A`, color: activeTheme.primary, borderColor: `${activeTheme.primary}33` }}
                  >
                    {job.duration}
                  </span>
                </div>
                <p className="text-slate-300 font-bold text-lg mb-2">{job.company}</p>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1 font-medium"><MapPin size={14} /> {job.location}</p>
                <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-md">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Education Column (Right Atoms) --- */}
        <div className="w-full">
          <motion.div variants={rightAtom} className="flex items-center gap-4 mb-12">
            <div 
              className="p-3 bg-black rounded-2xl border transition-all duration-500"
              style={{ borderColor: `${activeTheme.primary}33`, boxShadow: `0 0 15px ${activeTheme.glow}` }}
            >
              <GraduationCap style={{ color: activeTheme.primary }} size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
              Academic <span style={{ color: activeTheme.primary }}>Background</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div 
                key={i} 
                variants={rightAtom}
                whileHover={{ scale: 1.02, borderColor: activeTheme.primary }}
                className="group p-8 rounded-4xl bg-[#161616] border border-white/5 transition-all duration-500 shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white leading-tight flex-1">{edu.institution}</h4>
                  <div 
                    className="font-black text-xs font-mono px-2 py-1 rounded transition-all duration-500"
                    style={{ color: activeTheme.primary, backgroundColor: `${activeTheme.primary}1A` }}
                  >
                    {edu.score}
                  </div>
                </div>
                <p className="text-slate-400 text-base font-medium mb-4">{edu.degree}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-slate-500 text-[11px] font-bold rounded-lg border border-white/5 uppercase tracking-tighter">
                  Class of {edu.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Experience;