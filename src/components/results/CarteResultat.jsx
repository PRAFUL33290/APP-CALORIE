import { Droplet } from 'lucide-react';
import MacroCard from '../ui/MacroCard';
import ScoreSante from '../ui/ScoreSante';
import Bouton from '../ui/Bouton';

export default function CarteResultat({ resultat, onModifier, onSuivant }) {
  if (!resultat) return null;

  return (
    <div
      className="bg-white rounded-t-3xl px-4 pt-6 pb-8"
      style={{ animation: 'slideUp 0.6s ease-out', boxShadow: 'var(--shadow-elevated)' }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-3">{resultat.nom_plat}</h2>

      <div className="bg-[#F8F8FA] rounded-xl px-4 py-3 flex items-center justify-between mb-4">
        <span className="font-bold text-base text-gray-900">Total {resultat.total?.calories || 0} Kcal</span>
        <Droplet size={20} className="text-[#32ADE6]" />
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 border border-[#D1D1D6] rounded-2xl p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mb-1">
            <div className="w-3 h-3 rounded-full bg-[#FF9500]" />
          </div>
          <span className="text-xl font-bold">{resultat.total?.glucides || 0}g</span>
          <span className="text-xs text-gray-500">Glucides</span>
        </div>
        <div className="flex-1 border border-[#D1D1D6] rounded-2xl p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1">
            <div className="w-3 h-3 rounded-full bg-[#007AFF]" />
          </div>
          <span className="text-xl font-bold">{resultat.total?.proteines || 0}g</span>
          <span className="text-xs text-gray-500">Protéines</span>
        </div>
        <div className="flex-1 border border-[#D1D1D6] rounded-2xl p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-1">
            <div className="w-3 h-3 rounded-full bg-[#34C759]" />
          </div>
          <span className="text-xl font-bold">{resultat.total?.lipides || 0}g</span>
          <span className="text-xs text-gray-500">Lipides</span>
        </div>
      </div>

      <ScoreSante score={resultat.score_sante || 0} />

      <div className="flex gap-3 mt-6">
        <Bouton variant="outline" fullWidth onClick={onModifier}>Modifier les détails</Bouton>
        <Bouton fullWidth onClick={onSuivant}>Suivant</Bouton>
      </div>
    </div>
  );
}
