import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageWrapper from '../components/layout/PageWrapper';
import BottomNav from '../components/layout/BottomNav';
import StatsCard from '../components/profile/StatsCard';
import SettingsCard from '../components/profile/SettingsCard';
import Bouton from '../components/ui/Bouton';

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <PageWrapper>
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#32ADE6] flex items-center justify-center text-white text-2xl font-bold mb-3">
          {profile?.nom?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <h2 className="text-xl font-bold">{profile?.nom || 'Utilisateur'}</h2>
        <p className="text-sm text-gray-500">{user?.email || 'demo@scancalories.app'}</p>
      </div>

      <StatsCard
        joursConsecutifs={7}
        repasCannes={42}
        moyenneCal={1850}
      />

      {/* Objectifs */}
      <div className="bg-white rounded-2xl p-4 mt-3" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h3 className="font-bold text-base mb-3">Mes objectifs</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Objectif calorique</span>
            <span className="font-semibold">{profile?.objectif_calories || 2000} cal</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Poids actuel</span>
            <span className="font-semibold">{profile?.poids_actuel || '—'} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Poids cible</span>
            <span className="font-semibold">{profile?.poids_cible || '—'} kg</span>
          </div>
        </div>
      </div>

      <SettingsCard />

      <div className="mt-6 mb-4">
        <Bouton fullWidth variant="danger" onClick={handleSignOut}>
          Déconnexion
        </Bouton>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}
