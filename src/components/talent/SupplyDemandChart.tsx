
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Enhanced data showing the supply/demand gap with more fields
const supplyDemandData = [
  {
    field: 'Cybersecurity',
    current: 35,
    prospective: 25,
    demand: 100,
    gap: 40,
  },
  {
    field: 'Cloud Computing',
    current: 42,
    prospective: 22,
    demand: 85,
    gap: 21,
  },
  {
    field: 'Data Analytics',
    current: 50,
    prospective: 18,
    demand: 80,
    gap: 12,
  },
  {
    field: 'Software Dev',
    current: 60,
    prospective: 30,
    demand: 95,
    gap: 5,
  },
  {
    field: 'UX/UI Design',
    current: 28,
    prospective: 20,
    demand: 60,
    gap: 12,
  },
  {
    field: 'IT Project Mgmt',
    current: 32,
    prospective: 15,
    demand: 55,
    gap: 8,
  },
];

const SupplyDemandChart = () => {
  return (
    <div className="w-full h-full">
      <h4 className="text-sm font-medium mb-2">Tech Talent Supply vs Demand</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={supplyDemandData}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          barGap={0}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="field" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }} 
            formatter={(value, name) => {
              const formattedName = 
                name === 'current' ? 'Current Talent' : 
                name === 'prospective' ? 'Prospective Talent' : 
                name === 'demand' ? 'Market Demand' : 
                'Remaining Gap';
              return [value, formattedName];
            }}
          />
          <Legend formatter={(value) => {
            return value === 'current' ? 'Current Talent' : 
                   value === 'prospective' ? 'Prospective Talent' : 
                   value === 'demand' ? 'Market Demand' : 
                   'Remaining Gap';
          }} />
          <Bar dataKey="current" fill="#93C5FD" radius={[4, 4, 0, 0]} stackId="a" />
          <Bar dataKey="prospective" fill="#C4B5FD" radius={[4, 4, 0, 0]} stackId="a" />
          <Bar dataKey="gap" fill="#FED7AA" radius={[4, 4, 0, 0]} stackId="a" />
          <Bar dataKey="demand" fill="transparent" stroke="#1E3A8A" strokeWidth={2} strokeDasharray="5 5" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-1 text-center">
        Even with current and prospective talent, significant gaps remain in key tech fields
      </p>
    </div>
  );
};

export default SupplyDemandChart;
