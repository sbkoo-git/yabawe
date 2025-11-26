import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, XCircle, RotateCcw, Home } from 'lucide-react';

const ResultModal = ({ isOpen, isWin, amount, onPlayAgain, onGoHome }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative glass rounded-3xl p-8 max-w-sm w-full text-center overflow-hidden z-10"
          >
            {/* 배경 이펙트 - pointer-events-none 추가 */}
            {isWin && (
              <motion.div
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(255,215,0,0.5) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
              />
            )}

            {/* 아이콘 */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`
                w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative z-10
                ${isWin 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                  : 'bg-gradient-to-br from-red-500 to-pink-600'}
              `}
            >
              {isWin 
                ? <Trophy size={48} className="text-white" />
                : <XCircle size={48} className="text-white" />
              }
            </motion.div>

            {/* 타이틀 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl font-black mb-2 relative z-10 ${isWin ? 'text-yellow-400' : 'text-red-400'}`}
            >
              {isWin ? '🎉 승리!' : '😢 패배!'}
            </motion.h2>

            {/* 금액 변동 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-2xl font-bold mb-6 relative z-10 ${isWin ? 'text-green-400' : 'text-red-400'}`}
            >
              {isWin ? '+' : '-'}{Math.abs(amount).toLocaleString()} 코인
            </motion.p>

            {/* 메시지 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 mb-8 relative z-10"
            >
              {isWin 
                ? '대단해요! 공이 있는 컵을 맞췄습니다!' 
                : '아쉽네요! 다음엔 더 잘 할 수 있을 거예요!'}
            </motion.p>

            {/* 버튼들 - z-index 높게 설정 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 relative z-20"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAgain();
                }}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw size={20} />
                다시하기
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGoHome();
                }}
                className="py-4 px-6 rounded-xl bg-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/30 active:scale-95 transition-all cursor-pointer"
              >
                <Home size={20} />
              </button>
            </motion.div>

            {/* 승리 시 파티클 이펙트 - pointer-events-none 확실히 적용 */}
            {isWin && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: '50%',
                      y: '50%',
                      scale: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute w-3 h-3 rounded-full pointer-events-none"
                    style={{
                      background: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF'][i % 5],
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
