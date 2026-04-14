import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

const Hero = ({ socials, primaryColor }) => {
  const titles = [
    "AI ENGINEER.",
    "ML ENGINEER.",
    "QUANT DEVELOPER."
  ];

  const skills = [
    "Python", "Machine Learning", "Time Series", "NLP",
    "FastAPI", "Docker", "PostgreSQL",
    "Pandas", "NumPy", "Scikit-learn", "PyTorch"
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

<p className="text-slate-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed text-left">
  <span className="text-white font-semibold">
    AI Engineer building production-grade LLM + OCR systems.
  </span>
  <br /><br />
  Processed 15,000+ enterprise emails with 92% accuracy, reducing manual effort by 70%.
  <br /><br />
  Focused on real-world ML deployment, automation, and intelligent decision systems.
</p>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-2 bg-white/5 text-white text-xs rounded">
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