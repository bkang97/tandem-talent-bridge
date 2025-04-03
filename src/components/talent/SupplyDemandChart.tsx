
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

// Sample data showing the supply/demand gap
const supplyDemandData = [
  {
    field: 'Cybersecurity',
    supply: 35,
    demand: 100,
    gap: 65,
  },
  {
    field: 'Cloud Computing',
    supply: 42,
    demand: 85,
    gap: 43,
  },
  {
    field: 'Data Analytics',
    supply: 50,
    demand: 80,
    gap: 30,
  },
  {
    field: 'Software Dev',
    supply: 60,
    demand: 95,
    gap: 35,
  },
];

const SupplyDemandChart = () => {
  return (
    <div className="w-full h-64">
      <h4 className="text-sm font-medium mb-2">Tech Talent Supply vs Demand</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={supplyDemandData}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="field" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }} 
            formatter={(value, name) => {
              const formattedName = name === 'gap' ? 'Talent Gap' : 
                                   name === 'supply' ? 'Available Talent' : 'Market Demand';
              return [value, formattedName];
            }}
          />
          <Legend formatter={(value) => {
            return value === 'gap' ? 'Talent Gap' : 
                  value === 'supply' ? 'Available Talent' : 'Market Demand';
          }} />
          <Bar dataKey="supply" fill="#93C5FD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="demand" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-1 text-center">
        Data shows significant talent gaps across top tech fields
      </p>
    </div>
  );
};

export default SupplyDemandChart;
