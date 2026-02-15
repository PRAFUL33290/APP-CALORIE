import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, User, Plus } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/dashboard', icon: Home, label: 'Accueil' },
    { path: '/history', icon: BarChart3, label: 'Statistiques' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div
        className="flex items-center justify-between bg-[#1C1C1E] rounded-[28px] px-6 py-3"
        style={{ boxShadow: 'var(--shadow-nav)' }}
      >
        <div className="flex items-center gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-1 transition-colors"
              >
                <Icon size={22} color={isActive ? '#FFFFFF' : '#8E8E93'} />
                <span className={`text-xs ${isActive ? 'text-white' : 'text-gray-500'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => navigate('/scanner')}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center -mr-1 transition-transform hover:scale-105"
        >
          <Plus size={24} color="#1C1C1E" />
        </button>
      </div>
    </div>
  );
}
