import * as Lucide from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FEATURE ADDED: Receiving global theme props from App.jsx
const Footer = ({ socials, currentTheme, THEMES }) => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Helper to get active colors from props
  const activeTheme = THEMES[currentTheme];

  const Icon = ({ name, ...props }) => {
    const LucidIcon = Lucide[name] || Lucide.HelpCircle;
    return <LucidIcon {...props} />;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateWinner = (squares) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return squares.includes(null) ? null : "Tie";
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    const winner = calculateWinner(newBoard);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (winner === 'Tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) {
          newBoard[i] = 'O';
          let score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) {
          newBoard[i] = 'X';
          let score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const aiMove = () => {
    let bestScore = -Infinity;
    let move = -1;
    let currentBoard = [...board]; 
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    if (move !== -1) handleSquareClick(move, true);
  };

  useEffect(() => {
    if (!isXNext && !calculateWinner(board)) {
      const timer = setTimeout(aiMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext]);

  const handleSquareClick = (i, isAi = false) => {
    if (board[i] || calculateWinner(board)) return;
    if (!isAi && !isXNext) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <footer 
      className="transition-all duration-1000 py-16 md:py-24 px-6 md:px-20 text-black relative"
      style={{ backgroundColor: activeTheme.primary }}
    >
      <div className="max-w-4xl mx-auto text-center">

       {/* THE HEADER */}
        <h2 className="text-4xl md:text-7xl font-[1000] mb-8 tracking-[-0.08em] leading-[0.85] md:leading-[0.8] uppercase italic drop-shadow-sm">
          LET'S BUILD <br className="hidden md:block" /> 
          SOMETHING <span className="underline decoration-black/20 decoration-8 underline-offset-[-5px]">INTELLECTUAL.</span>
        </h2>

        {/* THE SUBTEXT */}
       <p className="text-black/90 font-bold text-lg md:text-2xl mb-12 md:mb-16 max-w-sm md:max-w-2xl mx-auto leading-snug tracking-tight">
          Available for <span className="bg-black px-3 py-1 rounded-sm mx-1" style={{ color: activeTheme.primary }}>freelance AI solutions</span> <br className="hidden md:block" />
          and full-stack web development projects.
        </p>

        {/* STATUS INDICATOR */}
        <div className="flex justify-center items-center gap-3 opacity-60 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
          </span>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-black">
            STATUS: ACTIVE
          </span>
        </div>

         {/* CONTACT SECTION */}
        <div className="flex flex-wrap justify-center items-start gap-12 md:gap-24 mb-16">
          <div className="flex flex-col items-center group">
            <a 
              href="mailto:yashchordiya7@gmail.com"
              className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-2xl transition-all group-hover:rotate-12 group-hover:scale-110 active:scale-95"
            >
              <Icon name="Mail" style={{ color: activeTheme.primary }} size={28} className="md:w-8 md:h-8" />
            </a>
            <a href="mailto:yashchordiya7@gmail.com" className="text-black font-black uppercase tracking-widest text-[10px] md:text-sm hover:opacity-60 transition-opacity">
              yashchordiya7@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center group">
            <a 
              href="tel:+919112030570" 
              className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-2xl transition-all group-hover:-rotate-12 group-hover:scale-110 active:scale-95"
            >
              <Icon name="Phone" style={{ color: activeTheme.primary }} size={28} className="md:w-8 md:h-8" />
            </a>
            <a href="tel:+919112030570" className="text-black font-black uppercase tracking-widest text-[10px] md:text-sm hover:opacity-60 transition-opacity">
              +91 91120 30570
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
          <a href="https://linkedin.com/in/yash-chordiya20" target="_blank" rel="noreferrer" className="group flex items-center gap-2 font-black uppercase tracking-widest text-[10px] md:text-xs border-b-2 border-black pb-1 hover:gap-4 transition-all">
            LinkedIn <Icon name="ChevronRight" size={14} className="group-hover:-rotate-45 transition-transform" />
          </a>
          <a href="https://github.com/yashchordiya07" target="_blank" rel="noreferrer" className="group flex items-center gap-2 font-black uppercase tracking-widest text-[10px] md:text-xs border-b-2 border-black pb-1 hover:gap-4 transition-all">
            GitHub <Icon name="Github" size={14} />
          </a>
          <button 
            onClick={() => setIsGameOpen(true)} 
            className="flex items-center gap-2 bg-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl"
            style={{ color: activeTheme.primary }}
          >
            Play with AI <Icon name="Gamepad2" size={16} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-black/20 gap-6 md:gap-0 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
          <p className="order-2 md:order-1 text-black/60">AI & DATA SCIENCE</p>
          <button onClick={scrollToTop} className="order-1 md:order-2 flex items-center gap-2 hover:scale-110 transition-transform cursor-pointer bg-black/10 px-4 py-2 rounded-full md:bg-transparent md:p-0">
            BACK TO TOP <Icon name="ArrowUp" size={12} />
          </button>
          <p className="order-3 text-black/60">NASHIK, INDIA</p>
        </div>
      </div>

      {/* GAME MODAL */}
      <AnimatePresence>
        {isGameOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.5, y: 100 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.5, y: 100 }} 
              className="bg-[#111111] border border-white/10 p-8 rounded-3xl max-w-sm w-full"
              style={{ boxShadow: `0 0 50px ${activeTheme.glow}` }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black uppercase tracking-widest text-xs" style={{ color: activeTheme.primary }}>AI Tic-Tac-Toe</h3>
                <button onClick={() => { setIsGameOpen(false); resetGame(); }} className="text-white/50 hover:text-white">
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {board.map((val, i) => (
                  <button key={i} onClick={() => handleSquareClick(i)} className="h-20 bg-white/5 rounded-xl border border-white/5 text-2xl font-black flex items-center justify-center text-white hover:bg-white/10 transition-all">
                    <span style={{ color: val === 'X' ? activeTheme.primary : 'white' }}>{val}</span>
                  </button>
                ))}
              </div>
              {calculateWinner(board) && (
                <p className="text-white text-center font-black uppercase text-sm mb-6 animate-pulse">
                  {calculateWinner(board) === 'Tie' ? "It's a Tie!" : `${calculateWinner(board)} Wins!`}
                </p>
              )}
              <button 
                onClick={resetGame} 
                className="w-full py-4 text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-95 transition-transform"
                style={{ backgroundColor: activeTheme.primary }}
              >
                Restart Game
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;