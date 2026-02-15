import { Calendar, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ nom = 'Utilisateur' }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#32ADE6] flex items-center justify-center text-white font-bold text-sm">
          {nom.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm text-gray-500">Bonjour !</p>
          <p className="font-bold text-lg text-gray-900">{nom}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/history')}
          className="w-10 h-10 rounded-full bg-[#F2F2F7] flex items-center justify-center"
        >
          <Calendar size={18} className="text-gray-600" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F2F2F7] flex items-center justify-center relative">
          <Bell size={18} className="text-gray-600" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
