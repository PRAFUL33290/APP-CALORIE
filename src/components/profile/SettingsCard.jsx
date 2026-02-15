import { useState } from 'react';

export default function SettingsCard() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [units, setUnits] = useState('kg');

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-7 rounded-full transition-colors relative ${value ? 'bg-[#34C759]' : 'bg-gray-300'}`}
    >
      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <div className="bg-white rounded-2xl p-4 mt-3" style={{ boxShadow: 'var(--shadow-card)' }}>
      <h3 className="font-bold text-base mb-3">Paramètres</h3>

      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <span className="text-sm">Mode sombre</span>
        <Toggle value={darkMode} onChange={setDarkMode} />
      </div>

      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <span className="text-sm">Notifications</span>
        <Toggle value={notifications} onChange={setNotifications} />
      </div>

      <div className="flex items-center justify-between py-3">
        <span className="text-sm">Unités</span>
        <div className="flex gap-1">
          {['kg', 'lbs'].map((u) => (
            <button
              key={u}
              onClick={() => setUnits(u)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                units === u ? 'bg-[#1C1C1E] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
