import Bouton from '../ui/Bouton';

export default function InfosStep({ data, onChange, onNext }) {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-center mb-6">Parlez-nous de vous</h1>

      <div className="flex flex-col gap-4 flex-1">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Sexe</label>
          <div className="flex gap-2">
            {['homme', 'femme'].map((s) => (
              <button
                key={s}
                onClick={() => update('sexe', s)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                  data.sexe === s ? 'bg-[#1C1C1E] text-white' : 'bg-[#F2F2F7] text-gray-900'
                }`}
              >
                {s === 'homme' ? 'Homme' : 'Femme'}
              </button>
            ))}
          </div>
        </div>

        {[
          { key: 'age', label: 'Âge', placeholder: '25' },
          { key: 'taille_cm', label: 'Taille (cm)', placeholder: '175' },
          { key: 'poids_actuel', label: 'Poids actuel (kg)', placeholder: '70' },
          { key: 'poids_cible', label: 'Poids cible (kg)', placeholder: '65' },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
            <input
              type="number"
              value={data[field.key] || ''}
              onChange={(e) => update(field.key, Number(e.target.value))}
              placeholder={field.placeholder}
              className="w-full bg-[#F2F2F7] rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-[#32ADE6]"
            />
          </div>
        ))}
      </div>

      <Bouton fullWidth onClick={onNext} disabled={!data.sexe || !data.age || !data.taille_cm || !data.poids_actuel} className="mt-6">
        Continuer
      </Bouton>
    </div>
  );
}
