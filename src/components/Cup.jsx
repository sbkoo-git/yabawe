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
      style={{ width: 'clamp(64px, 20vw, 128px)', height: 'clamp(56px, 18vw, 120px)' }}
    >
      {/* 바닥 그림자 */}
      <div 
        className="absolute bottom-0 w-12 sm:w-20 md:w-32 h-2 sm:h-3 md:h-5 bg-black/40 rounded-full blur-md"
        style={{ zIndex: 1 }}
      />

      {/* 공 (그릇 바닥에 위치) */}
      <motion.div 
        className="absolute"
        style={{ 
          bottom: '4px',
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

      {/* 아이보리색 도자기 밥공기 (엎어진 상태) */}
      <motion.div
        animate={{
          y: isRevealed ? -45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        whileHover={isSelectable ? { scale: 1.05, y: -6 } : {}}
        whileTap={isSelectable ? { scale: 0.95 } : {}}
        onClick={() => isSelectable && onClick(id)}
        className={`
          relative cursor-pointer w-full h-full
          ${isSelectable ? 'hover:brightness-105' : 'cursor-not-allowed'}
        `}
        style={{ 
          zIndex: 10,
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))'
        }}
      >
        {/* 아이보리색 도자기 밥공기 SVG */}
        <svg 
          className="w-full h-full"
          viewBox="0 0 160 120"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* 그릇 메인 그라데이션 - 아이보리색 */}
            <linearGradient id={`bowlBody-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8E4D0" />
              <stop offset="15%" stopColor="#F5F3E5" />
              <stop offset="30%" stopColor="#FAF8ED" />
              <stop offset="50%" stopColor="#FFFEF5" />
              <stop offset="70%" stopColor="#FAF8ED" />
              <stop offset="85%" stopColor="#F5F3E5" />
              <stop offset="100%" stopColor="#E8E4D0" />
            </linearGradient>

            {/* 내부 그라데이션 (어두운 부분) */}
            <radialGradient id={`bowlInner-${id}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#D8D4C0" />
              <stop offset="100%" stopColor="#B8B4A0" />
            </radialGradient>

            {/* 테두리 그라데이션 */}
            <linearGradient id={`bowlRim-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F0ECD8" />
              <stop offset="50%" stopColor="#E8E4D0" />
              <stop offset="100%" stopColor="#D8D4C0" />
            </linearGradient>
          </defs>
          
          {/* 그릇 본체 - 부드러운 곡선 형태 */}
          <path
            d="M20 105
               C20 65, 30 40, 50 32
               C65 26, 95 26, 110 32
               C130 40, 140 65, 140 105
               Q140 112, 80 112
               Q20 112, 20 105 Z"
            fill={`url(#bowlBody-${id})`}
          />

          {/* 도자기 질감 - 가로 라인들 */}
          <path d="M35 52 Q80 48 125 52" stroke="#E8E4D0" strokeWidth="0.6" fill="none" opacity="0.5"/>
          <path d="M30 62 Q80 58 130 62" stroke="#E8E4D0" strokeWidth="0.6" fill="none" opacity="0.4"/>
          <path d="M27 72 Q80 68 133 72" stroke="#E8E4D0" strokeWidth="0.6" fill="none" opacity="0.4"/>
          <path d="M25 82 Q80 78 135 82" stroke="#E8E4D0" strokeWidth="0.6" fill="none" opacity="0.3"/>
          <path d="M23 92 Q80 88 137 92" stroke="#E8E4D0" strokeWidth="0.6" fill="none" opacity="0.3"/>
          <path d="M22 100 Q80 96 138 100" stroke="#E8E4D0" strokeWidth="0.6" fill="none" opacity="0.2"/>

          {/* 그릇 입구 (아래쪽 - 테두리) */}
          <ellipse
            cx="80"
            cy="107"
            rx="60"
            ry="7"
            fill={`url(#bowlRim-${id})`}
          />

          {/* 그릇 내부 (어두운 부분) */}
          <ellipse
            cx="80"
            cy="107"
            rx="50"
            ry="4"
            fill={`url(#bowlInner-${id})`}
          />

          {/* 왼쪽 메인 하이라이트 */}
          <path
            d="M40 48 Q44 68 48 92"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* 왼쪽 작은 하이라이트 */}
          <path
            d="M52 45 Q55 58 58 72"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* 오른쪽 미세 반사 */}
          <path
            d="M115 52 Q118 68 120 88"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* 귀여운 눈 */}
          {/* 왼쪽 눈 */}
          <ellipse cx="62" cy="62" rx="10" ry="12" fill="white" stroke="#E0DCD0" strokeWidth="1"/>
          <g>
            <ellipse cx="62" cy="64" rx="5" ry="6" fill="#2D2D2D">
              <animate attributeName="cx" values="58;66;58" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            <circle cx="60" cy="61" r="1.5" fill="white">
              <animate attributeName="cx" values="56;64;56" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* 오른쪽 눈 */}
          <ellipse cx="98" cy="62" rx="10" ry="12" fill="white" stroke="#E0DCD0" strokeWidth="1"/>
          <g>
            <ellipse cx="98" cy="64" rx="5" ry="6" fill="#2D2D2D">
              <animate attributeName="cx" values="94;102;94" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            <circle cx="96" cy="61" r="1.5" fill="white">
              <animate attributeName="cx" values="92;100;92" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* 볼터치 */}
          <ellipse cx="48" cy="76" rx="7" ry="4" fill="#FFB6C1" opacity="0.45"/>
          <ellipse cx="112" cy="76" rx="7" ry="4" fill="#FFB6C1" opacity="0.45"/>

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
      </motion.div>

      {/* 빈 그릇 표시 (실패 시) */}
      {isRevealed && !hasBall && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute"
          style={{ bottom: '8px', zIndex: 15 }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl">❌</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cup;
