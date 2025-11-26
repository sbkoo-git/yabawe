import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import HUD from './components/HUD';
import ResultModal from './components/ResultModal';
import Tutorial from './components/Tutorial';

// 난이도 설정
const DIFFICULTY_SETTINGS = {
  easy: { shuffleSpeed: 600, shuffleCount: 5 },
  medium: { shuffleSpeed: 350, shuffleCount: 8 },
  hard: { shuffleSpeed: 150, shuffleCount: 12 },
};

// 초기 컵 상태
const createInitialCups = () => [
  { id: 0, hasBall: false, state: 'idle' },
  { id: 1, hasBall: true, state: 'idle' },
  { id: 2, hasBall: false, state: 'idle' },
];

function App() {
  // 게임 상태
  const [phase, setPhase] = useState('idle'); // idle, betting, shuffling, selecting, revealed, result
  const [cups, setCups] = useState(createInitialCups());
  const [positions, setPositions] = useState([0, 0, 0]);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(100);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // 모달 상태
  const [showResult, setShowResult] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [resultAmount, setResultAmount] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  // 첫 방문 시 튜토리얼 표시
  useEffect(() => {
    const hasVisited = localStorage.getItem('shellGameVisited');
    if (!hasVisited) {
      setShowTutorial(true);
      localStorage.setItem('shellGameVisited', 'true');
    }
  }, []);

  // 공 위치 랜덤 설정
  const randomizeBall = useCallback(() => {
    const ballIndex = Math.floor(Math.random() * 3);
    setCups(cups => cups.map((cup, index) => ({
      ...cup,
      hasBall: index === ballIndex,
      state: 'idle'
    })));
  }, []);

  // 셔플 애니메이션
  const shuffle = useCallback(async () => {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    // 🔧 셔플 거리를 80px로 축소 (모바일 대응)
    const swapPositions = [
      [-80, 0, 80],
      [80, -80, 0],
      [0, 80, -80],
      [-80, 80, 0],
      [80, 0, -80],
      [0, -80, 80],
    ];

    setPhase('shuffling');

    // 먼저 공을 숨기고 섞기 시작
    setCups(cups => cups.map(cup => ({ ...cup, state: 'shuffling' })));

    for (let i = 0; i < settings.shuffleCount; i++) {
      const randomSwap = swapPositions[Math.floor(Math.random() * swapPositions.length)];
      setPositions(randomSwap);
      await new Promise(resolve => setTimeout(resolve, settings.shuffleSpeed));
    }

    // 원래 위치로 복귀
    setPositions([0, 0, 0]);
    await new Promise(resolve => setTimeout(resolve, 300));

    setPhase('selecting');
  }, [difficulty]);

  // 게임 시작
  const handleStart = useCallback(async () => {
    if (phase !== 'idle' || bet === 0 || bet > balance) return;

    // 공 위치 랜덤 설정
    randomizeBall();
    
    // 잠시 공 보여주기
    setCups(cups => cups.map(cup => ({ ...cup, state: 'revealed' })));
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 컵 닫기
    setCups(cups => cups.map(cup => ({ ...cup, state: 'idle' })));
    await new Promise(resolve => setTimeout(resolve, 500));

    // 셔플 시작
    await shuffle();
  }, [phase, bet, balance, randomizeBall, shuffle]);

  // 컵 선택
  const handleCupClick = useCallback((cupId) => {
    if (phase !== 'selecting') return;

    const selectedCup = cups.find(cup => cup.id === cupId);
    const won = selectedCup?.hasBall || false;

    // 모든 컵 열기
    setCups(cups => cups.map(cup => ({ ...cup, state: 'revealed' })));
    setPhase('revealed');

    // 결과 처리
    setTimeout(() => {
      if (won) {
        setBalance(prev => prev + bet);
        setWins(prev => prev + 1);
        setResultAmount(bet);
      } else {
        setBalance(prev => prev - bet);
        setLosses(prev => prev + 1);
        setResultAmount(-bet);
      }
      setIsWin(won);
      setShowResult(true);
      setPhase('result');
    }, 1000);
  }, [phase, cups, bet]);

  // 다시하기
  const handlePlayAgain = useCallback(() => {
    setShowResult(false);
    setCups(createInitialCups());
    setPositions([0, 0, 0]);
    setPhase('idle');
  }, []);

  // 리셋
  const handleReset = useCallback(() => {
    setShowResult(false);
    setCups(createInitialCups());
    setPositions([0, 0, 0]);
    setPhase('idle');
    setBalance(1000);
    setWins(0);
    setLosses(0);
    setBet(100);
  }, []);

  return (
    <div className="min-h-screen py-2 px-1 sm:py-4 sm:px-2 md:py-8 md:px-4 overflow-x-hidden">
      {/* 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2 sm:mb-4 md:mb-8"
      >
        <h1 className="text-xl sm:text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-1">
          🎩 야바위 게임
        </h1>
        <p className="text-white/60 text-[10px] sm:text-xs md:text-base">공이 있는 컵을 맞춰보세요!</p>
      </motion.header>

      {/* HUD */}
      <HUD 
        balance={balance} 
        wins={wins} 
        losses={losses}
        currentBet={phase !== 'idle' && phase !== 'result' ? bet : 0}
      />

      {/* 게임 보드 */}
      <GameBoard
        cups={cups}
        phase={phase}
        onCupClick={handleCupClick}
        positions={positions}
      />

      {/* 컨트롤 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 sm:mt-4 md:mt-8"
      >
        <Controls
          bet={bet}
          balance={balance}
          onBetChange={setBet}
          onStart={handleStart}
          onReset={handleReset}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onShowTutorial={() => setShowTutorial(true)}
          soundEnabled={soundEnabled}
          phase={phase}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      </motion.div>

      {/* 잔액 부족 경고 */}
      <AnimatePresence>
        {balance <= 0 && phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 glass rounded-xl px-6 py-4 text-center"
          >
            <p className="text-red-400 font-bold mb-2">💸 잔액이 부족합니다!</p>
            <button
              onClick={handleReset}
              className="text-sm text-white/70 hover:text-white underline"
            >
              게임 초기화하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 결과 모달 */}
      <ResultModal
        isOpen={showResult}
        isWin={isWin}
        amount={resultAmount}
        onPlayAgain={handlePlayAgain}
        onGoHome={handleReset}
      />

      {/* 튜토리얼 모달 */}
      <Tutorial
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
}

export default App;
