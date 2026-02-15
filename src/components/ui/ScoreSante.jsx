import { useState, useEffect } from 'react';

export default function ScoreSante({ score = 0 }) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const position = (animated / 10) * 100;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-base text-gray-900">Score santé</span>
        <span className="text-base font-bold text-gray-900">{score}/10</span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden flex">
        <div className="flex-1 bg-[#F5A623]" />
        <div className="flex-1 bg-[#007AFF]" />
        <div className="flex-1 bg-[#34C759]" />
      </div>
      <div className="relative h-4 -mt-3">
        <div
          className="absolute w-3 h-3 bg-gray-900 rounded-full border-2 border-white -translate-x-1/2"
          style={{
            left: `${position}%`,
            transition: 'left 0.8s ease-out',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </div>
  );
}
