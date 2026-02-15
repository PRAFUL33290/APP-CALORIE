import { TrendingDown, Scale, TrendingUp } from 'lucide-react';
import Bouton from '../ui/Bouton';

const options = [
  { value: 'perte', label: 'Perdre du poids', desc: 'Réduire votre masse corporelle', icon: TrendingDown },
  { value: 'maintien', label: 'Maintenir mon poids', desc: 'Garder votre poids actuel', icon: Scale },
  { value: 'prise', label: 'Prendre de la masse', desc: 'Augmenter votre masse musculaire', icon: TrendingUp },
];

export default function ObjectifStep({ value, onChange, onNext }) {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-center mb-8">Quel est votre objectif ?</h1>
      <div className="flex flex-col gap-3 flex-1">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                isSelected ? 'border-[#1C1C1E] shadow-md bg-white' : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#1C1C1E]' : 'bg-gray-100'}`}>
                <Icon size={22} className={isSelected ? 'text-white' : 'text-gray-600'} />
              </div>
              <div>
                <p className="font-semibold text-base">{opt.label}</p>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
      <Bouton fullWidth onClick={onNext} disabled={!value} className="mt-6">
        Continuer
      </Bouton>
    </div>
  );
}
