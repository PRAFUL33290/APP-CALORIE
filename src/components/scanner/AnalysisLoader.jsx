import { useState, useEffect } from 'react';

const messages = [
  'Analyse en cours...',
  'Identification des aliments...',
  'Calcul des calories...',
];

export default function AnalysisLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
      <p className="text-white text-base font-semibold">{messages[messageIndex]}</p>
    </div>
  );
}
