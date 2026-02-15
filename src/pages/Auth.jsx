import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Bouton from '../components/ui/Bouton';
import PageWrapper from '../components/layout/PageWrapper';

export default function Auth() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/onboarding');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <PageWrapper noNav>
      <div className="flex flex-col justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte gratuitement'}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-[#F2F2F7] rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-[#32ADE6]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            minLength={6}
            className="w-full bg-[#F2F2F7] rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-[#32ADE6]"
          />
          <Bouton fullWidth disabled={loading}>
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
          </Bouton>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-500">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Bouton variant="outline" fullWidth onClick={signInWithGoogle}>
          Continuer avec Google
        </Bouton>

        <p className="text-center text-sm mt-6">
          <span className="text-gray-500">
            {isLogin ? "Pas encore de compte ? " : 'Déjà un compte ? '}
          </span>
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#007AFF] font-semibold">
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>
    </PageWrapper>
  );
}
