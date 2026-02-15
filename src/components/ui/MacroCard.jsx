import { useState, useEffect } from 'react';

export default function MacroCard({ label, valeur, objectif, couleur, icon, delay = 0 }) {
  const [animated, setAnimated] = useState(0);
  const percentage = Math.min((valeur / objectif) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(percentage), 100 + delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  const radius = 18;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="relative">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={radius} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} />
          <circle
            cx="22" cy="22" r={radius}
            fill="none"
            stroke={couleur}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 22 22)"
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs">
          {icon}
        </div>
      </div>
      <span className="text-xl font-bold mt-1" style={{ color: couleur }}>{valeur}g</span>
      <span className="text-xs text-gray-500 text-center">{label}</span>
    </div>
  );
}
