import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRepas } from '../hooks/useRepas';
import PageWrapper from '../components/layout/PageWrapper';
import BottomNav from '../components/layout/BottomNav';
import Calendrier from '../components/history/Calendrier';
import JourDetail from '../components/history/JourDetail';
import TrendChart from '../components/history/TrendChart';

export default function History() {
  const { profile } = useAuth();
  const { repas, fetchRepas } = useRepas(profile?.id);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (profile?.id) {
      fetchRepas();
    }
  }, [profile?.id, fetchRepas]);

  const repasParJour = repas.reduce((acc, r) => {
    if (!acc[r.date]) {
      acc[r.date] = { repas: [], totalCalories: 0 };
    }
    acc[r.date].repas.push(r);
    acc[r.date].totalCalories += r.total_calories || 0;
    acc[r.date].ratio = acc[r.date].totalCalories / (profile?.objectif_calories || 2000);
    return acc;
  }, {});

  const selectedRepas = selectedDate ? (repasParJour[selectedDate]?.repas || []) : [];

  const trendData = Object.entries(repasParJour).map(([date, data]) => ({
    date: date.slice(5),
    calories: data.totalCalories,
  })).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-4">Historique</h1>

      <Calendrier repasParJour={repasParJour} onSelectDate={setSelectedDate} />

      {selectedDate && selectedRepas.length > 0 && (
        <JourDetail
          date={selectedDate}
          repas={selectedRepas}
          objectif={profile?.objectif_calories || 2000}
        />
      )}

      <TrendChart data={trendData} objectif={profile?.objectif_calories || 2000} />

      <BottomNav />
    </PageWrapper>
  );
}
