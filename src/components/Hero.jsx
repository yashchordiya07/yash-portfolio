import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

const Hero = ({ socials, primaryColor }) => {
  const titles = [
    "AI ENGINEER.",
    "ML ENGINEER.",
    "QUANT DEVELOPER."
  ];

  const skills = [
    "Python",
    "Machine Learning",
    "NLP",
    "LLM Systems",
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "Time Series"
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="px-6 md:px-12 lg:px-20 py-20 md:py-40 flex flex-col md:flex-row items-center justify-between gap-16">

      {/* LEFT */}
      <div className="text-center md:text-left flex-1">

        <h1 className="text-white text-2xl md:text-4xl font-black mb-8 uppercase">
          Hi, I am <br />
          <span style={{ color: primaryColor }}>
            YASH CHORDIYA
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed text-left">
          <span className="text-white font-semibold text-xl md:text-2xl leading-snug">
            AI Engineer building production-grade <br />
            LLM + OCR systems
          </span>
          <br /><br />
          <span className="text-slate-200 font-medium">
            Processed 15,000+ enterprise emails with 92% accuracy, reducing manual effort by 70%.
          </span>
          <br /><br />
          Focused on ML deployment, automation, and decision systems.
        </p>

        {/* ✅ NEW BUTTONS */}
        <div className="flex flex-wrap gap-4 mb-8">

          <a
            href="/Resume.pdf"
            download
            className="flex items-center gap-2 bg-[#a2df0c] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            📄 Download Resume
          </a>

          <a
            href="https://github.com/yashchordiya07"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition text-white"
          >
            GitHub
          </a>

        </div>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-2 bg-white/5 text-white text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-72 h-72 rounded-full overflow-hidden border">
          <img
            src="/yash-portfolio/Aditya.png"
            alt="Yash Chordiya"
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-2xl text-white font-bold">
          Yash Chordiya
        </h3>
      </div>

    </header>
  );
};

export default Hero;