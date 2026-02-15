const JOURS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function WeekSelector({ selectedDate, onSelectDate }) {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((currentDay + 6) % 7));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  return (
    <div className="flex justify-between mb-4">
      {weekDays.map((date, index) => {
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();
        return (
          <button
            key={index}
            onClick={() => onSelectDate?.(date.toISOString().split('T')[0])}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-colors ${
              isToday || isSelected ? 'bg-[#1C1C1E]' : ''
            }`}
          >
            <span className={`text-sm ${isToday || isSelected ? 'text-white' : 'text-gray-500'}`}>
              {JOURS[index]}
            </span>
            <span className={`text-sm font-medium ${isToday || isSelected ? 'text-white' : 'text-gray-900'}`}>
              {String(date.getDate()).padStart(2, '0')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
