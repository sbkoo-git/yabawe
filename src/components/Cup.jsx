import { motion } from 'framer-motion';
import Ball from './Ball';

const Cup = ({ id, hasBall, isRevealed, isSelectable, onClick, position }) => {
  return (
    <motion.div
      layout
      animate={{ x: position }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        duration: 0.3
      }}
      className="relative flex flex-col items-center justify-end"
      // 🔧 반응형 크기: 모바일 70px → 태블릿 110px → 데스크톱 150px
      style={{ width: 'clamp(70px, 22vw, 150px)', height: 'clamp(60px, 20vw, 140px)' }}
    >
      {/* 바닥 그림자 */}
      <div 
        className="absolute bottom-0 w-14 sm:w-24 md:w-36 h-2 sm:h-3 md:h-5 bg-black/40 rounded-full blur-md"
        style={{ zIndex: 1 }}
      />

      {/* 공 (컵 바닥에 위치) */}
      <motion.div 
        className="absolute"
        style={{ 
          bottom: '2px',
          zIndex: 5
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isRevealed && hasBall ? 1 : 0,
          scale: isRevealed && hasBall ? 1 : 0
        }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
      >
        <Ball visible={true} />
      </motion.div>

      {/* 엎어진 컵 (바닥이 위, 입구가 아래) */}
      <motion.div
        animate={{
          y: isRevealed ? -50 : 0,  // 🔧 모바일에서 덜 올라가도록 축소
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        whileHover={isSelectable ? { scale: 1.05, y: -5 } : {}}
        whileTap={isSelectable ? { scale: 0.95 } : {}}
        onClick={() => isSelectable && onClick(id)}
        className={`
          relative cursor-pointer w-full h-full
          ${isSelectable ? 'hover:brightness-110' : 'cursor-not-allowed'}
        `}
        style={{ 
          zIndex: 10,
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5))'
        }}
      >
        {/* 엎어진 컵 SVG - viewBox 유지하고 크기는 CSS로 조절 */}
        <svg 
          className="w-full h-full"
          viewBox="0 0 180 112"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* 메인 컵 그라데이션 - 빨간색 */}
            <linearGradient id={`cupMain-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B0000" />
              <stop offset="15%" stopColor="#B22222" />
              <stop offset="35%" stopColor="#DC143C" />
              <stop offset="50%" stopColor="#FF4444" />
              <stop offset="65%" stopColor="#DC143C" />
              <stop offset="85%" stopColor="#B22222" />
              <stop offset="100%" stopColor="#6B0000" />
            </linearGradient>

            {/* 컵 바닥 그라데이션 */}
            <radialGradient id={`cupBottom-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6666" />
              <stop offset="70%" stopColor="#CC2222" />
              <stop offset="100%" stopColor="#880000" />
            </radialGradient>

            {/* 컵 내부 어둠 (아래쪽 입구) */}
            <radialGradient id={`cupInner-${id}`} cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a0505" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>
          
          {/* 컵 몸체 */}
          <path
            d="M55 6 
               L125 6
               C130 6, 130 14, 125 14
               L138 100
               C138 108, 42 108, 42 100
               L55 14
               C50 14, 50 6, 55 6 Z"
            fill={`url(#cupMain-${id})`}
          />

          {/* 컵 바닥 (위쪽) */}
          <ellipse
            cx="90"
            cy="10"
            rx="38"
            ry="7"
            fill={`url(#cupBottom-${id})`}
          />

          {/* 컵 바닥 테두리 */}
          <ellipse
            cx="90"
            cy="10"
            rx="38"
            ry="7"
            fill="none"
            stroke="#440000"
            strokeWidth="2"
          />

          {/* 컵 입구 (아래쪽) */}
          <ellipse
            cx="90"
            cy="103"
            rx="50"
            ry="8"
            fill={`url(#cupInner-${id})`}
          />

          {/* 컵 입구 테두리 */}
          <ellipse
            cx="90"
            cy="103"
            rx="50"
            ry="8"
            fill="none"
            stroke="#660000"
            strokeWidth="3"
          />

          {/* 왼쪽 하이라이트 */}
          <path
            d="M62 20 Q65 55 68 92"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* 오른쪽 미세 반사광 */}
          <path
            d="M110 22 Q113 55 116 88"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* === 익살스러운 얼굴 === */}
          
          {/* 왼쪽 눈 */}
          <ellipse cx="70" cy="45" rx="12" ry="14" fill="white" />
          <ellipse cx="72" cy="47" rx="6" ry="7" fill="#222" />
          <circle cx="74" cy="44" r="2" fill="white" />
          
          {/* 오른쪽 눈 */}
          <ellipse cx="110" cy="45" rx="12" ry="14" fill="white" />
          <ellipse cx="108" cy="47" rx="6" ry="7" fill="#222" />
          <circle cx="110" cy="44" r="2" fill="white" />

          {/* 눈썹 - 컵마다 다른 스타일 */}
          {id === 0 && (
            <>
              <path d="M58 32 Q70 28 82 34" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M98 34 Q110 28 122 32" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {id === 1 && (
            <>
              <path d="M58 30 Q70 34 82 30" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M98 30 Q110 34 122 30" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}
          {id === 2 && (
            <>
              <line x1="58" y1="32" x2="82" y2="32" stroke="#222" strokeWidth="3" strokeLinecap="round" />
              <line x1="98" y1="32" x2="122" y2="32" stroke="#222" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* 입 - 컵마다 다른 스타일 */}
          {id === 0 && (
            <path d="M75 72 Q90 82 105 72" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {id === 1 && (
            <>
              <path d="M72 68 Q90 85 108 68" stroke="#222" strokeWidth="3" fill="#FF6B6B" strokeLinecap="round" />
              <ellipse cx="90" cy="78" rx="8" ry="4" fill="#CC0000" />
            </>
          )}
          {id === 2 && (
            <>
              <path d="M70 70 Q90 88 110 70" stroke="#222" strokeWidth="3" fill="#FF8888" strokeLinecap="round" />
              <rect x="78" y="70" width="24" height="8" fill="white" rx="2" />
            </>
          )}

          {/* 볼터치 */}
          <ellipse cx="55" cy="60" rx="8" ry="5" fill="#FF9999" opacity="0.6" />
          <ellipse cx="125" cy="60" rx="8" ry="5" fill="#FF9999" opacity="0.6" />

        </svg>

        {/* 선택 가능 표시 - 반짝이는 효과 */}
        {isSelectable && (
          <motion.div
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="absolute -bottom-2 sm:-bottom-3 md:-bottom-5 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full shadow-lg" 
                 style={{ boxShadow: '0 0 8px #ffd700, 0 0 16px #ffa500' }} />
          </motion.div>
        )}

        {/* 호버/선택 시 말풍선 - 모바일에서는 숨김 */}
        {isSelectable && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="hidden sm:block absolute -top-5 md:-top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded-full text-[10px] md:text-sm font-bold shadow-lg whitespace-nowrap"
          >
            {id === 0 && "나야 나! 🙋"}
            {id === 1 && "여기여기! 🎯"}
            {id === 2 && "날 골라줘~ 💕"}
          </motion.div>
        )}
      </motion.div>

      {/* 빈 컵 표시 (실패 시) */}
      {isRevealed && !hasBall && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute"
          style={{ bottom: '8px', zIndex: 15 }}
        >
          <span className="text-xl sm:text-2xl md:text-4xl">❌</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cup;
