import { motion, AnimatePresence } from 'framer-motion';

const HUD = ({ balance, wins, losses, currentBet }) => {
  return (
    <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-4 px-1">
      {/* 잔액 - 초소형 */}
      <motion.div
        layout
        className="glass rounded px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 text-center"
      >
        <span className="text-[7px] sm:text-[9px] md:text-xs text-white/50">💰</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={balance}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            className="text-[10px] sm:text-sm md:text-xl font-bold text-yellow-400 ml-0.5"
          >
            {balance.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* 현재 베팅 */}
      {currentBet > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 text-center"
        >
          <span className="text-[7px] sm:text-[9px] md:text-xs text-white/50">🎯</span>
          <span className="text-[10px] sm:text-sm md:text-xl font-bold text-purple-400 ml-0.5">
            {currentBet}
          </span>
        </motion.div>
      )}

      {/* 전적 - 초소형 */}
      <motion.div
        layout
        className="glass rounded px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 text-center"
      >
        <span className="text-[7px] sm:text-[9px] md:text-xs text-white/50">🏆</span>
        <span className="text-[10px] sm:text-sm md:text-lg font-bold ml-0.5">
          <span className="text-green-400">{wins}</span>
          <span className="text-white/40">/</span>
          <span className="text-red-400">{losses}</span>
        </span>
      </motion.div>
    </div>
  );
};

export default HUD;

