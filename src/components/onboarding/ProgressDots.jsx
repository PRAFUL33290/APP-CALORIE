export default function ProgressDots({ total = 3, current = 0 }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current ? 'w-8 h-2 bg-[#1C1C1E]' : 'w-2 h-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
