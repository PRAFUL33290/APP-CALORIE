import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRepas } from '../hooks/useRepas';
import ScanOverlay from '../components/scanner/ScanOverlay';
import CarteResultat from '../components/results/CarteResultat';
import AlimentItem from '../components/results/AlimentItem';
import PageWrapper from '../components/layout/PageWrapper';

export default function Results() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { ajouterRepas } = useRepas(profile?.id);
  const [resultat, setResultat] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('scan-result');
    const storedPhoto = sessionStorage.getItem('scan-photo');
    if (stored) setResultat(JSON.parse(stored));
    if (storedPhoto) setPhoto(storedPhoto);
  }, []);

  const handleSave = async () => {
    if (!resultat) return;
    try {
      await ajouterRepas({
        nom_plat: resultat.nom_plat,
        photo_url: photo,
        total_calories: resultat.total?.calories || 0,
        total_proteines: resultat.total?.proteines || 0,
        total_glucides: resultat.total?.glucides || 0,
        total_lipides: resultat.total?.lipides || 0,
        score_sante: resultat.score_sante || 0,
        commentaire_ia: resultat.commentaire || '',
        type_repas: 'dejeuner',
      });
    } catch {
      // Continue even on save error (demo mode)
    }
    sessionStorage.removeItem('scan-result');
    sessionStorage.removeItem('scan-photo');
    navigate('/dashboard');
  };

  if (!resultat) {
    return (
      <PageWrapper noNav>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Aucun résultat à afficher</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-black relative max-w-md mx-auto">
      {/* Photo */}
      <div className="relative h-[40vh]">
        {photo && <img src={photo} alt="Repas" className="w-full h-full object-cover" />}
        <ScanOverlay aliments={resultat.aliments || []} />
      </div>

      {/* Results card */}
      <div className="relative -mt-6">
        {showDetails ? (
          <div className="bg-white rounded-t-3xl px-4 pt-6 pb-8" style={{ animation: 'slideUp 0.6s ease-out' }}>
            <h2 className="text-xl font-bold mb-4">Détails des aliments</h2>
            {(resultat.aliments || []).map((a, i) => (
              <AlimentItem key={i} aliment={a} />
            ))}
            <div className="mt-4">
              <button
                onClick={() => setShowDetails(false)}
                className="w-full py-3 bg-[#1C1C1E] text-white rounded-xl font-semibold"
              >
                Retour
              </button>
            </div>
          </div>
        ) : (
          <CarteResultat
            resultat={resultat}
            onModifier={() => setShowDetails(true)}
            onSuivant={handleSave}
          />
        )}
      </div>
    </div>
  );
}
