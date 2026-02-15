import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { calculerMetabolisme, calculerObjectifCalories } from '../utils/calculations';
import PageWrapper from '../components/layout/PageWrapper';
import ProgressDots from '../components/onboarding/ProgressDots';
import ObjectifStep from '../components/onboarding/ObjectifStep';
import InfosStep from '../components/onboarding/InfosStep';
import Bouton from '../components/ui/Bouton';

const activites = [
  { value: 'sedentaire', label: 'Sédentaire', desc: 'Peu ou pas d\'exercice' },
  { value: 'leger', label: 'Légèrement actif', desc: 'Exercice léger 1-3 jours/semaine' },
  { value: 'modere', label: 'Modérément actif', desc: 'Exercice modéré 3-5 jours/semaine' },
  { value: 'actif', label: 'Actif', desc: 'Exercice intense 6-7 jours/semaine' },
  { value: 'tres_actif', label: 'Très actif', desc: 'Exercice très intense, travail physique' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [objectif, setObjectif] = useState('');
  const [infos, setInfos] = useState({ sexe: '', age: '', taille_cm: '', poids_actuel: '', poids_cible: '' });
  const [activite, setActivite] = useState('');

  const handleFinish = async () => {
    const metabolisme = calculerMetabolisme(infos.sexe, infos.poids_actuel, infos.taille_cm, infos.age);
    const objectifCalories = calculerObjectifCalories(metabolisme, activite, objectif);

    try {
      await updateProfile({
        ...infos,
        objectif_type: objectif,
        niveau_activite: activite,
        objectif_calories: objectifCalories,
        onboarding_complete: true,
      });
    } catch {
      // Continue even if profile update fails (e.g., demo mode)
    }
    navigate('/dashboard');
  };

  return (
    <PageWrapper noNav>
      <div className="min-h-screen flex flex-col px-4 py-8">
        <ProgressDots total={3} current={step} />

        <div className="flex-1 mt-4">
          {step === 0 && (
            <ObjectifStep value={objectif} onChange={setObjectif} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <InfosStep data={infos} onChange={setInfos} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <div className="flex flex-col h-full">
              <h1 className="text-2xl font-bold text-center mb-6">Votre niveau d&apos;activité ?</h1>
              <div className="flex flex-col gap-3 flex-1">
                {activites.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setActivite(a.value)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      activite === a.value ? 'border-[#1C1C1E] shadow-md bg-white' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <p className="font-semibold text-base">{a.label}</p>
                    <p className="text-sm text-gray-500">{a.desc}</p>
                  </button>
                ))}
              </div>
              <Bouton fullWidth onClick={handleFinish} disabled={!activite} className="mt-6">
                Commencer
              </Bouton>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
