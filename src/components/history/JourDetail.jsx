import RepasCard from '../ui/RepasCard';

export default function JourDetail({ date, repas = [], objectif = 2000 }) {
  const totalCalories = repas.reduce((sum, r) => sum + (r.total_calories || 0), 0);

  return (
    <div className="bg-white rounded-2xl p-4 mt-3" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-sm">{date}</span>
        <span className="text-sm text-gray-500">{totalCalories} / {objectif} cal</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
        <div
          className="h-2 rounded-full bg-[#32ADE6]"
          style={{ width: `${Math.min((totalCalories / objectif) * 100, 100)}%` }}
        />
      </div>
      <div className="flex flex-col gap-2">
        {repas.map((r) => (
          <RepasCard key={r.id} repas={r} />
        ))}
      </div>
    </div>
  );
}
