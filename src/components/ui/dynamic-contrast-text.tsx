"use client";

export const DynamicContrastText = () => {
  return (
    <span 
      className="font-bold"
      style={{
        background: 'linear-gradient(to right, #F97316, #EF4444, #F59E0B)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        mixBlendMode: 'difference',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      From International Universities.
    </span>
  );
};
