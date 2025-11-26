import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointer, Eye, Trophy, Coins } from 'lucide-react';

const Tutorial = ({ isOpen, onClose }) => {
  const steps = [
    {
      icon: <Coins className="text-yellow-400" size={32} />,
      title: '1. 베팅하기',
      description: '게임 시작 전 베팅할 금액을 선택하세요. 10, 50, 100, 500 코인 중 선택할 수 있습니다.'
    },
    {
      icon: <Eye className="text-purple-400" size={32} />,
      title: '2. 공 확인하기',
      description: '게임 시작 시 공이 있는 컵을 잘 확인하세요. 컵이 섞이는 동안 공의 위치를 추적해야 합니다.'
    },
    {
      icon: <MousePointer className="text-blue-400" size={32} />,
      title: '3. 컵 선택하기',
      description: '셔플이 끝나면 공이 있다고 생각하는 컵을 클릭하세요.'
    },
    {
      icon: <Trophy className="text-green-400" size={32} />,
      title: '4. 보상 받기',
      description: '맞추면 베팅 금액의 2배를 받고, 틀리면 베팅 금액을 잃습니다.'
    }
  ];

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
            onClick={onClose}
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative glass rounded-3xl p-8 max-w-lg w-full"
          >
            {/* 닫기 버튼 */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20"
            >
              <X size={20} />
            </motion.button>

            {/* 타이틀 */}
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-black text-white mb-2"
              >
                🎮 게임 방법
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/60"
              >
                야바위 게임의 규칙을 알아보세요!
              </motion.p>
            </div>

            {/* 단계별 설명 */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 팁 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
            >
              <p className="text-yellow-400 text-sm">
                💡 <strong>팁:</strong> 난이도를 '쉬움'으로 설정하면 셔플 속도가 느려져서 공을 더 쉽게 추적할 수 있어요!
              </p>
            </motion.div>

            {/* 확인 버튼 */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold"
            >
              알겠어요! 게임 시작하기
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tutorial;

