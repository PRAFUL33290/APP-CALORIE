export default function AlimentItem({ aliment, onUpdate }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div>
        <p className="font-semibold text-sm text-gray-900">{aliment.nom}</p>
        <p className="text-xs text-gray-500">{aliment.portion_g}g</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="text-orange-500">{aliment.glucides}g G</span>
        <span className="text-blue-500">{aliment.proteines}g P</span>
        <span className="text-green-500">{aliment.lipides}g L</span>
        <span className="font-semibold text-gray-900">{aliment.calories} cal</span>
      </div>
    </div>
  );
}
