import { useState, useEffect } from 'react';

export default function JaugeCalories({ valeur = 0, objectif = 2000 }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const percentage = Math.min((valeur / objectif) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = valeur / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= valeur) {
        setDisplayCount(valeur);
        clearInterval(interval);
      } else {
        setDisplayCount(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [valeur]);

  const radius = 80;
  const strokeWidth = 12;
  const circumference = Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8D8EA" />
            <stop offset="100%" stopColor="#32ADE6" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path
          d={`M ${100 - radius} 100 A ${radius} ${radius} 0 0 1 ${100 + radius} 100`}
          fill="none"
          stroke="#E5E5EA"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${100 - radius} 100 A ${radius} ${radius} 0 0 1 ${100 + radius} 100`}
          fill="none"
          stroke="url(#calorieGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
        {/* Tick marks */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = Math.PI + (i / 19) * Math.PI;
          const x1 = 100 + (radius + 8) * Math.cos(angle);
          const y1 = 100 + (radius + 8) * Math.sin(angle);
          const x2 = 100 + (radius + 14) * Math.cos(angle);
          const y2 = 100 + (radius + 14) * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D1D1D6" strokeWidth="1.5" strokeLinecap="round" />
          );
        })}
      </svg>
      <div className="text-center -mt-16">
        <span className="text-5xl font-bold text-gray-900">{displayCount}</span>
        <div className="mt-1">
          <span className="text-sm text-gray-500">Total </span>
          <span className="text-sm font-semibold text-gray-900">Calories</span>
        </div>
      </div>
    </div>
  );
}
