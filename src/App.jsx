import { useEffect, useState } from 'react'
// axios is no longer needed since we are using local data
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Certificates from './components/Certificates.jsx'
import Footer from './components/Footer.jsx'

// 1. Define the Global Themes
const THEMES = {
  default: { primary: '#a2df0c', bg: '#111111', selection: '#a2df0c' },
  orange:  { primary: '#ea580c', bg: '#050505', selection: '#ea580c' },
  blue:    { primary: '#1d4ed8', bg: '#000816', selection: '#1d4ed8' },
  red:     { primary: '#b91c1c', bg: '#0a0000', selection: '#b91c1c' },
  yellow:  { primary: '#eab308', bg: '#070700', selection: '#eab308' },
  cyan:    { primary: '#0891b2', bg: '#001015', selection: '#0891b2' },
  violet:  { primary: '#8b5cf6', bg: '#100015', selection: '#8b5cf6' },
};

// 2. Your Profile Data (Previously from the Backend)
const profileData = {
    projects: [
        {
            id: 1,
            title: "Sign Language Recognition",
            tech: ["Python", "MediaPipe", "OpenCV"],
            description: "Real-time AI gesture recognition."
        },
        {
            id: 2,
            title: "Drowsiness Detection",
            tech: ["Python", "Computer Vision"],
            description: "AI-based driver safety system."
        }
    ],
    education: [
        {
            institution: "Engineering College",
            degree: "B.E. in AI & Data Science",
            year: "2022 - 2026"
        }
    ],
    socials: {
        linkedin: "https://linkedin.com/in/yash-chordiya20",
        github: "https://github.com/yashchordiya07"
    }
};

function App() {
  const [data, setData] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Directly set the data from our local object
    setData(profileData);
  }, []);

  if (!data) return (
    <div className="bg-[#111111] h-screen w-full flex items-center justify-center text-[#a2df0c] font-mono p-4 text-center">
      <div className="animate-pulse tracking-widest text-sm md:text-base">
        INITIALIZING_SYSTEM...
      </div>
    </div>
  );

  const activeTheme = THEMES[currentTheme];

  return (
    <div 
      className="transition-colors duration-1000 min-h-screen w-full flex flex-col md:p-10"
      style={{ 
        backgroundColor: '#24292e', 
        '--selection-bg': activeTheme.selection 
      }}
    >
      <style>{`
        ::selection {
          background-color: ${activeTheme.selection} !important;
          color: black !important;
        }
      `}</style>
      
      <div 
        className="grow w-full max-w-7xl mx-auto shadow-2xl rounded-none md:rounded-[40px] overflow-hidden border border-white/5 flex flex-col transition-colors duration-1000"
        style={{ backgroundColor: activeTheme.bg }}
      >
        
        <Hero socials={data.socials} primaryColor={activeTheme.primary} />
        
        <Projects 
          projects={data.projects} 
          currentTheme={currentTheme} 
          setCurrentTheme={setCurrentTheme} 
          THEMES={THEMES} 
        />
        
       <Experience 
          currentTheme={currentTheme} 
          THEMES={THEMES} 
        />

       <Certificates 
          currentTheme={currentTheme} 
          THEMES={THEMES} 
        />
        
        <Footer
          currentTheme={currentTheme} 
          THEMES={THEMES} 
        />

      </div>
    </div>
  );
}

export default App;