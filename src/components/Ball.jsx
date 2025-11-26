import { motion } from 'framer-motion';

const Ball = ({ visible = true }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: visible ? 1 : 0, 
        opacity: visible ? 1 : 0 
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="relative"
    >
      {/* 공 그림자 */}
      <div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 sm:w-7 md:w-10 h-1.5 sm:h-2 md:h-3 bg-black/30 rounded-full blur-sm"
        style={{ display: visible ? 'block' : 'none' }}
      />
      
      {/* 메인 공 - 🔧 반응형 크기 */}
      <div
        className="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #FFD700, #FFA500 40%, #FF8C00 70%, #B8860B 100%)',
          boxShadow: visible 
            ? '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.5), 0 0 60px rgba(255, 140, 0, 0.3), inset 0 -8px 15px rgba(0,0,0,0.3), inset 0 5px 10px rgba(255,255,255,0.4)' 
            : 'none'
        }}
      >
        {/* 하이라이트 */}
        <div 
          className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)'
          }}
        />

        {/* 별 마크 (당구공 느낌) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs sm:text-base md:text-2xl" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>⭐</span>
        </div>
      </div>

      {/* 빛나는 효과 */}
      {visible && (
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
            transform: 'scale(1.5)',
          }}
        />
      )}
    </motion.div>
  );
};

export default Ball;
