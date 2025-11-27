"use client";

export const StripeMeshGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-pink-50/40 to-blue-100/50" />
      
      {/* Animated mesh gradient orbs - reduced to 3, smaller, less blur */}
      <div className="absolute inset-0">
        {/* Purple orb - top left */}
        <div 
          className="absolute -top-10 -left-10 w-[500px] h-[500px] rounded-full blur-xl opacity-75 animate-orb-1"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.95) 0%, rgba(139, 92, 246, 0.6) 30%, rgba(139, 92, 246, 0.2) 60%, transparent 75%)',
          }}
        />
        
        {/* Pink/Orange orb - top right */}
        <div 
          className="absolute -top-5 -right-10 w-[550px] h-[550px] rounded-full blur-xl opacity-80 animate-orb-2"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 1) 0%, rgba(251, 113, 133, 0.7) 30%, rgba(251, 146, 60, 0.3) 60%, transparent 75%)',
          }}
        />
        
        {/* Blue orb - bottom center */}
        <div 
          className="absolute -bottom-5 left-1/3 w-[600px] h-[600px] rounded-full blur-xl opacity-70 animate-orb-3"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(99, 102, 241, 0.6) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 75%)',
          }}
        />
      </div>
    </div>
  );
};
