export default function ScanOverlay({ aliments = [] }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Corner marks */}
      <div className="absolute" style={{ top: '15%', left: '15%', width: 40, height: 40 }}>
        <div className="absolute top-0 left-0 w-10 h-[3px] bg-[#B8A94E] rounded-full" />
        <div className="absolute top-0 left-0 w-[3px] h-10 bg-[#B8A94E] rounded-full" />
      </div>
      <div className="absolute" style={{ top: '15%', right: '15%', width: 40, height: 40 }}>
        <div className="absolute top-0 right-0 w-10 h-[3px] bg-[#B8A94E] rounded-full" />
        <div className="absolute top-0 right-0 w-[3px] h-10 bg-[#B8A94E] rounded-full" />
      </div>
      <div className="absolute" style={{ bottom: '25%', left: '15%', width: 40, height: 40 }}>
        <div className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#B8A94E] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[3px] h-10 bg-[#B8A94E] rounded-full" />
      </div>
      <div className="absolute" style={{ bottom: '25%', right: '15%', width: 40, height: 40 }}>
        <div className="absolute bottom-0 right-0 w-10 h-[3px] bg-[#B8A94E] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[3px] h-10 bg-[#B8A94E] rounded-full" />
      </div>

      {/* Food tags */}
      {aliments.map((aliment, index) => (
        <div
          key={index}
          className="absolute flex items-center gap-1"
          style={{
            left: `${aliment.position?.x || 50}%`,
            top: `${aliment.position?.y || 50}%`,
            transform: 'translate(-50%, -50%)',
            animation: `fadeIn 0.4s ease-out ${index * 0.2}s both`,
          }}
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div
            className="px-3.5 py-1.5 rounded-2xl text-white text-sm font-semibold whitespace-nowrap"
            style={{ backgroundColor: 'rgba(107, 114, 95, 0.85)' }}
          >
            {aliment.nom}
          </div>
        </div>
      ))}
    </div>
  );
}
