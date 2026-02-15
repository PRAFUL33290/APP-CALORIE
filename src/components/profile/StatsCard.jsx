import { Flame, Camera, BarChart3 } from 'lucide-react';

export default function StatsCard({ joursConsecutifs = 0, repasCannes = 0, moyenneCal = 0 }) {
  const stats = [
    { icon: Flame, label: 'Jours consécutifs', value: joursConsecutifs, color: '#FF9500' },
    { icon: Camera, label: 'Repas scannés', value: repasCannes, color: '#007AFF' },
    { icon: BarChart3, label: 'Moyenne cal/jour', value: moyenneCal, color: '#34C759' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className={`flex items-center gap-3 ${i > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + '15' }}>
              <Icon size={20} style={{ color: stat.color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="font-bold text-lg">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
