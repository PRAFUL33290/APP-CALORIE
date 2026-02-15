import { useNavigate } from 'react-router-dom';
import { Camera, BarChart3, Apple } from 'lucide-react';
import Bouton from '../components/ui/Bouton';
import PageWrapper from '../components/layout/PageWrapper';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <PageWrapper noNav>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-20 h-20 bg-[#1C1C1E] rounded-3xl flex items-center justify-center mb-8">
          <Camera size={36} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-center mb-2">Scan Calories</h1>
        <p className="text-base text-gray-500 text-center mb-8">
          Photographiez votre repas et obtenez un bilan nutritionnel instantané grâce à l&apos;IA
        </p>

        <div className="flex flex-col gap-4 w-full mb-8">
          {[
            { icon: Camera, text: 'Scannez vos repas en photo' },
            { icon: BarChart3, text: 'Suivez vos calories quotidiennes' },
            { icon: Apple, text: 'Atteignez vos objectifs santé' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F7] flex items-center justify-center">
                <item.icon size={20} className="text-[#32ADE6]" />
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col gap-3">
          <Bouton fullWidth onClick={() => navigate('/auth')}>Commencer</Bouton>
          <Bouton fullWidth variant="outline" onClick={() => navigate('/dashboard')}>Voir la démo</Bouton>
        </div>
      </div>
    </PageWrapper>
  );
}
