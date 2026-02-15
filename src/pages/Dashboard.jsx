import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRepas } from '../hooks/useRepas';
import { useNutrition } from '../hooks/useNutrition';
import PageWrapper from '../components/layout/PageWrapper';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import JaugeCalories from '../components/ui/JaugeCalories';
import MacroCard from '../components/ui/MacroCard';
import WeekSelector from '../components/dashboard/WeekSelector';
import SuiviJour from '../components/dashboard/SuiviJour';

export default function Dashboard() {
  const { profile } = useAuth();
  const { repas, fetchRepas } = useRepas(profile?.id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todayRepas = repas.filter(r => r.date === selectedDate);
  const { besoins, consomme, restant } = useNutrition(profile, todayRepas);

  useEffect(() => {
    if (profile?.id) {
      fetchRepas(selectedDate);
    }
  }, [profile?.id, selectedDate, fetchRepas]);

  return (
    <PageWrapper>
      <Header nom={profile?.nom || 'Utilisateur'} />
      <WeekSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <div className="bg-white rounded-2xl p-4 mb-4" style={{ boxShadow: 'var(--shadow-card)' }}>
        <JaugeCalories valeur={consomme.calories} objectif={besoins.objectifCalories} />

        <div className="flex mt-4 gap-2">
          <MacroCard
            label="Glucides restants"
            valeur={consomme.glucides}
            objectif={besoins.macros?.glucides || 225}
            couleur="#FF9500"
            icon={<span>🍞</span>}
            delay={0}
          />
          <MacroCard
            label="Protéines restantes"
            valeur={consomme.proteines}
            objectif={besoins.macros?.proteines || 150}
            couleur="#007AFF"
            icon={<span>🥩</span>}
            delay={300}
          />
          <MacroCard
            label="Lipides restants"
            valeur={consomme.lipides}
            objectif={besoins.macros?.lipides || 56}
            couleur="#34C759"
            icon={<span>🥑</span>}
            delay={600}
          />
        </div>
      </div>

      <SuiviJour repas={todayRepas} />
      <BottomNav />
    </PageWrapper>
  );
}
