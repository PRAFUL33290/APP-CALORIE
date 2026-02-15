import { Flame } from 'lucide-react';

export default function RepasCard({ repas }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-3" style={{ boxShadow: 'var(--shadow-card)' }}>
      {repas.photo_url ? (
        <img
          src={repas.photo_url}
          alt={repas.nom_plat}
          className="w-15 h-15 rounded-xl object-cover"
          style={{ width: 60, height: 60 }}
        />
      ) : (
        <div className="w-15 h-15 rounded-xl bg-gray-100 flex items-center justify-center" style={{ width: 60, height: 60 }}>
          <Flame size={24} className="text-gray-400" />
        </div>
      )}
      <div className="flex-1">
        <p className="font-semibold text-base text-gray-900">{repas.nom_plat}</p>
        <div className="flex items-center gap-1 mt-1">
          <Flame size={14} className="text-[#32ADE6]" />
          <span className="text-sm text-gray-500">{repas.total_calories} Calories</span>
        </div>
      </div>
    </div>
  );
}
