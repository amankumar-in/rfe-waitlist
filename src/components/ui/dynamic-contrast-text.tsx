"use client";

export const DynamicContrastText = () => {
  return (
    <span 
      className="font-bold"
      style={{
        background: 'linear-gradient(to right, #F97316, #EF4444, #F59E0B)', // Orange/Red source -> Blue on White
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        mixBlendMode: 'difference',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <span className="dark:hidden">From International Universities.</span>
      <span className="hidden dark:inline-block" style={{
         background: 'linear-gradient(to right, #60A5FA, #818CF8, #2DD4BF)', // Blue/Cyan source -> Blue on Black
         WebkitBackgroundClip: 'text',
         WebkitTextFillColor: 'transparent',
         backgroundClip: 'text',
      }}>From International Universities.</span>
    </span>
  );
};
