import { motion } from 'framer-motion';
import { Play, RotateCcw, Volume2, VolumeX, HelpCircle } from 'lucide-react';

const Controls = ({ 
  bet, 
  balance, 
  onBetChange, 
  onStart, 
  onReset,
  onToggleSound,
  onShowTutorial,
  soundEnabled,
  phase,
  difficulty,
  onDifficultyChange
}) => {
  const betOptions = [10, 50, 100, 500];
  const isDisabled = phase !== 'idle' && phase !== 'result';

  return (
    <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-5 w-full max-w-[240px] sm:max-w-xs md:max-w-md mx-auto">
      {/* 베팅 + 난이도를 한 줄로 */}
      <div className="flex gap-2 mb-1.5 sm:mb-2 md:mb-4">
        {/* 베팅 금액 */}
        <div className="flex-1">
          <label className="text-white/80 text-[8px] sm:text-[10px] md:text-sm font-medium mb-0.5 sm:mb-1 block">
            💰 베팅
          </label>
          <div className="grid grid-cols-4 gap-0.5">
            {betOptions.map((amount) => (
              <motion.button
                key={amount}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBetChange(amount)}
                disabled={isDisabled || amount > balance}
                className={`
                  py-1 sm:py-1.5 md:py-2 rounded text-[8px] sm:text-[10px] md:text-xs font-bold transition-all
                  ${bet === amount 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'}
                  ${(isDisabled || amount > balance) && 'opacity-50 cursor-not-allowed'}
                `}
              >
                {amount}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 난이도 선택 */}
      <div className="mb-1.5 sm:mb-2 md:mb-4">
        <label className="text-white/80 text-[8px] sm:text-[10px] md:text-sm font-medium mb-0.5 sm:mb-1 block">
          ⚡ 난이도
        </label>
        <div className="grid grid-cols-3 gap-0.5">
          {['easy', 'medium', 'hard'].map((level) => (
            <motion.button
              key={level}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDifficultyChange(level)}
              disabled={isDisabled}
              className={`
                py-0.5 sm:py-1 md:py-1.5 rounded text-[7px] sm:text-[9px] md:text-xs font-medium transition-all
                ${difficulty === level 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'}
                ${isDisabled && 'opacity-50 cursor-not-allowed'}
              `}
            >
              {level === 'easy' ? '🐢쉬움' : level === 'medium' ? '🐇보통' : '🚀어려움'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 메인 버튼들 */}
      <div className="flex gap-1">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          disabled={phase !== 'idle' || bet === 0}
          className={`
            flex-1 py-1.5 sm:py-2 md:py-3 rounded font-bold text-[10px] sm:text-xs md:text-base flex items-center justify-center gap-0.5
            ${phase === 'idle' && bet > 0
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white btn-glow'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
          `}
        >
          <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5" />
          START
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="p-1.5 sm:p-2 md:p-3 rounded bg-white/10 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleSound}
          className="p-1.5 sm:p-2 md:p-3 rounded bg-white/10 text-white/70 hover:bg-white/20"
        >
          {soundEnabled ? <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5" /> : <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5" />}
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onShowTutorial}
          className="p-1.5 sm:p-2 md:p-3 rounded bg-white/10 text-white/70 hover:bg-white/20"
        >
          <HelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Controls;

