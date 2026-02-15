export default function MacroDonut({ glucides = 0, proteines = 0, lipides = 0 }) {
  const total = glucides + proteines + lipides;
  if (total === 0) return null;

  const gPct = (glucides / total) * 100;
  const pPct = (proteines / total) * 100;
  const lPct = (lipides / total) * 100;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const gLen = (gPct / 100) * circumference;
  const pLen = (pPct / 100) * circumference;
  const lLen = (lPct / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#FF9500" strokeWidth="8"
          strokeDasharray={`${gLen} ${circumference - gLen}`} strokeDashoffset="0" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#007AFF" strokeWidth="8"
          strokeDasharray={`${pLen} ${circumference - pLen}`} strokeDashoffset={-gLen} transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#34C759" strokeWidth="8"
          strokeDasharray={`${lLen} ${circumference - lLen}`} strokeDashoffset={-(gLen + pLen)} transform="rotate(-90 50 50)" />
      </svg>
    </div>
  );
}
