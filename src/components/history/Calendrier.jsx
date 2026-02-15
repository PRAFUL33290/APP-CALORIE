import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JOURS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default function Calendrier({ repasParJour = {}, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getIndicator = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const data = repasParJour[dateStr];
    if (!data) return null;
    if (data.ratio <= 0.9) return 'bg-green-500';
    if (data.ratio <= 1.1) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1"><ChevronLeft size={20} /></button>
        <span className="font-bold text-base">{MOIS[month]} {year}</span>
        <button onClick={nextMonth} className="p-1"><ChevronRight size={20} /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {JOURS.map((j, i) => (
          <div key={i} className="text-xs text-gray-500 py-1">{j}</div>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const today = new Date();
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const indicator = getIndicator(day);

          return (
            <button
              key={day}
              onClick={() => onSelectDate?.(dateStr)}
              className={`py-2 rounded-full text-sm relative ${
                isToday ? 'bg-[#1C1C1E] text-white font-bold' : 'text-gray-900'
              }`}
            >
              {day}
              {indicator && (
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${indicator}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
