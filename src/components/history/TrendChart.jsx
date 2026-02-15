import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

export default function TrendChart({ data = [], objectif = 2000 }) {
  const [period, setPeriod] = useState('7');

  const displayData = period === '7' ? data.slice(-7) : data.slice(-30);

  return (
    <div className="bg-white rounded-2xl p-4 mt-3" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setPeriod('7')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            period === '7' ? 'bg-[#1C1C1E] text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          7 jours
        </button>
        <button
          onClick={() => setPeriod('30')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            period === '30' ? 'bg-[#1C1C1E] text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          30 jours
        </button>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#8E8E93" />
          <YAxis tick={{ fontSize: 12 }} stroke="#8E8E93" />
          <Tooltip />
          <ReferenceLine y={objectif} stroke="#8E8E93" strokeDasharray="5 5" label="Objectif" />
          <Line type="monotone" dataKey="calories" stroke="#32ADE6" strokeWidth={2} dot={{ fill: '#32ADE6', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
