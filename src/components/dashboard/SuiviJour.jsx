import RepasCard from '../ui/RepasCard';

export default function SuiviJour({ repas = [] }) {
  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg text-gray-900 mb-3">Suivi du jour</h3>
      {repas.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">
          Aucun repas enregistré aujourd&apos;hui
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {repas.map((r) => (
            <RepasCard key={r.id} repas={r} />
          ))}
        </div>
      )}
    </div>
  );
}
