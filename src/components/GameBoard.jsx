import { motion } from 'framer-motion';
import Cup from './Cup';

const GameBoard = ({ cups, phase, onCupClick, positions }) => {
  const isSelectable = phase === 'selecting';
  const isShuffling = phase === 'shuffling';

  return (
    <div className="flex flex-col items-center py-2 sm:py-4 md:py-8 overflow-x-hidden">
      {/* 게임 테이블 */}
      <div className="relative">
        
        {/* 🦊 마스크 쓴 사기꾼 여우 캐릭터 */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-0 sm:top-2 md:top-4 z-10"
          animate={isShuffling ? {
            x: [0, -10, 10, -10, 10, 0],
            rotate: [0, -5, 5, -5, 5, 0],
          } : {
            y: [0, -2, 0],
          }}
          transition={isShuffling ? {
            duration: 0.25,
            repeat: Infinity,
          } : {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 사기꾼 여우 */}
          <svg 
            className="w-16 h-14 sm:w-24 sm:h-20 md:w-36 md:h-28" 
            viewBox="0 0 200 140"
          >
            {/* 몸통 (검은 망토/후드) */}
            <ellipse cx="100" cy="115" rx="45" ry="25" fill="#1a1a1a"/>
            <path d="M55 100 Q100 80 145 100 L145 120 Q100 130 55 120 Z" fill="#2d2d2d"/>
            
            {/* 여우 얼굴 (오렌지) */}
            <ellipse cx="100" cy="55" rx="50" ry="42" fill="#FF6B35"/>
            
            {/* 얼굴 하얀 부분 */}
            <ellipse cx="100" cy="70" rx="30" ry="28" fill="#FFF5E6"/>
            
            {/* 도둑 마스크 (검은색) */}
            <path d="M45 45 Q100 35 155 45 L150 65 Q100 55 50 65 Z" fill="#1a1a1a"/>
            {/* 마스크 눈구멍 */}
            <ellipse cx="70" cy="52" rx="14" ry="10" fill="#FF6B35"/>
            <ellipse cx="130" cy="52" rx="14" ry="10" fill="#FF6B35"/>
            
            {/* 눈 - 교활한 눈 */}
            {isShuffling ? (
              <>
                {/* 셔플 중 - 돈 눈 */}
                <circle cx="70" cy="52" r="10" fill="#FFD700"/>
                <text x="64" y="57" fontSize="14" fill="#1a1a1a" fontWeight="bold">$</text>
                <circle cx="130" cy="52" r="10" fill="#FFD700"/>
                <text x="124" y="57" fontSize="14" fill="#1a1a1a" fontWeight="bold">$</text>
              </>
            ) : (
              <>
                {/* 평소 - 교활한 눈 */}
                <ellipse cx="70" cy="52" rx="8" ry="9" fill="white"/>
                <ellipse cx="130" cy="52" rx="8" ry="9" fill="white"/>
                <ellipse cx="73" cy="53" rx="4" ry="5" fill="#2d2d2d"/>
                <ellipse cx="133" cy="53" rx="4" ry="5" fill="#2d2d2d"/>
                <circle cx="75" cy="51" r="1.5" fill="white"/>
                <circle cx="135" cy="51" r="1.5" fill="white"/>
              </>
            )}
            
            {/* 눈썹 - 사악한 각도 */}
            <path d="M52 40 L82 46" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
            <path d="M148 40 L118 46" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
            
            {/* 코 */}
            <ellipse cx="100" cy="72" rx="6" ry="5" fill="#2d2d2d"/>
            
            {/* 입 - 사악한 미소 */}
            <path d="M82 82 Q100 95 118 82" stroke="#2d2d2d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* 송곳니 */}
            <path d="M88 84 L90 90 L92 84" fill="white" stroke="#2d2d2d" strokeWidth="0.5"/>
            <path d="M108 84 L110 90 L112 84" fill="white" stroke="#2d2d2d" strokeWidth="0.5"/>
            
            {/* 뾰족한 귀 */}
            <path d="M50 35 L35 5 L65 30 Z" fill="#FF6B35"/>
            <path d="M52 32 L42 12 L60 28 Z" fill="#FFB088"/>
            <path d="M150 35 L165 5 L135 30 Z" fill="#FF6B35"/>
            <path d="M148 32 L158 12 L140 28 Z" fill="#FFB088"/>
            
            {/* 수염 */}
            <line x1="75" y1="75" x2="45" y2="70" stroke="#2d2d2d" strokeWidth="1.5"/>
            <line x1="75" y1="78" x2="45" y2="80" stroke="#2d2d2d" strokeWidth="1.5"/>
            <line x1="125" y1="75" x2="155" y2="70" stroke="#2d2d2d" strokeWidth="1.5"/>
            <line x1="125" y1="78" x2="155" y2="80" stroke="#2d2d2d" strokeWidth="1.5"/>
            
            {/* 돈자루 (뒤에) */}
            <ellipse cx="170" cy="95" rx="15" ry="20" fill="#8B7355" opacity="0.8"/>
            <text x="163" y="100" fontSize="12" fill="#2d2d2d">$</text>
          </svg>
          
          {/* 말풍선 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isShuffling ? 1 : 0, 
              scale: isShuffling ? 1 : 0 
            }}
            className="absolute -right-4 sm:-right-8 -top-0 sm:-top-1 bg-white px-1 sm:px-1.5 py-0.5 rounded-md text-[7px] sm:text-[9px] font-bold shadow-lg whitespace-nowrap border border-gray-200"
          >
            속았지? 😈
            <div className="absolute -bottom-0.5 left-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white border-r border-b border-gray-200 rotate-45" />
          </motion.div>
        </motion.div>
        
        {/* 테이블 표면 */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[220px] sm:w-[300px] md:w-[450px] h-3 sm:h-5 md:h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full opacity-50 blur-sm" />
        
        {/* 그릇들 */}
        <div className="flex justify-center items-end gap-1 sm:gap-3 md:gap-6 min-h-[100px] sm:min-h-[140px] md:min-h-[200px] px-2 pt-16 sm:pt-24 md:pt-32">
          {cups.map((cup, index) => (
            <Cup
              key={cup.id}
              id={cup.id}
              hasBall={cup.hasBall}
              isRevealed={cup.state === 'revealed'}
              isSelectable={isSelectable}
              onClick={onCupClick}
              position={positions[index]}
            />
          ))}
        </div>
      </div>

      {/* 게임 상태 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 sm:mt-6 md:mt-12 text-center px-2"
      >
        {phase === 'idle' && (
          <p className="text-white/70 text-xs sm:text-sm md:text-lg">베팅하고 START를 눌러주세요!</p>
        )}
        {phase === 'betting' && (
          <p className="text-yellow-400 text-xs sm:text-sm md:text-lg font-semibold">베팅 금액을 선택하세요</p>
        )}
        {phase === 'shuffling' && (
          <motion.p
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-orange-400 text-sm sm:text-base md:text-xl font-bold"
          >
            🦊 사기꾼이 컵을 섞는 중...
          </motion.p>
        )}
        {phase === 'selecting' && (
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-green-400 text-sm sm:text-base md:text-xl font-bold"
          >
            👆 공이 있는 컵을 선택하세요!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default GameBoard;

