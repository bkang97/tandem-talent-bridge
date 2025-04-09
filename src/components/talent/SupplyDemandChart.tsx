import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Enhanced data showing the supply/demand gap with more fields
const supplyDemandData = [
  {
    field: "Auto Technician",
    current: 45,
    prospective: 30,
    demand: 120,
    gap: 45, // 120 - 45 - 30
  },
  {
    field: "Combination Welder",
    current: 55,
    prospective: 25,
    demand: 150,
    gap: 70, // 150 - 55 - 25
  },
  {
    field: "Maritime Welder", // Shortened for chart label
    current: 30, // Example: Fewer grads than general welding
    prospective: 20,
    demand: 90, // Example: Specific but strong demand
    gap: 40, // 90 - 30 - 20
  },
  {
    field: "Construction Trades", // General category
    current: 60, // Example: Broader field, more grads
    prospective: 40,
    demand: 180, // Example: High overall demand
    gap: 80, // 180 - 60 - 40
  },
  {
    field: "HVAC Technician",
    current: 40,
    prospective: 28,
    demand: 110,
    gap: 42, // 110 - 40 - 28
  },
];

const SupplyDemandChart = () => {
  return (
    <div className="w-full h-[400px] min-h-[300px] mb-4">
      {/* Updated Title */}
      <h4 className="text-sm font-medium mb-2">
        Skilled Trades Supply vs Demand
      </h4>
      <div className="h-[calc(100%-30px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={supplyDemandData} // Assuming this data will be updated for trades
            margin={{ top: 5, right: 5, left: 0, bottom: 25 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            {/* XAxis likely shows 'Auto Tech', 'Welder', etc. based on data */}
            <XAxis dataKey="field" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee" }}
              formatter={(value, name) => {
                // Tooltip labels remain the same conceptually
                const formattedName =
                  name === "current"
                    ? "Current Talent"
                    : name === "prospective"
                    ? "Prospective Talent"
                    : name === "demand"
                    ? "Market Demand"
                    : "Remaining Gap";
                return [value, formattedName];
              }}
            />
            <Legend
              formatter={(value) => {
                // Legend labels remain the same conceptually
                return value === "current"
                  ? "Current Talent"
                  : value === "prospective"
                  ? "Prospective Talent"
                  : value === "demand"
                  ? "Market Demand"
                  : "Remaining Gap";
              }}
              margin={{ top: 0, left: 0, right: 0, bottom: 10 }}
              wrapperStyle={{ paddingTop: 15 }}
            />
            {/* Bar definitions remain the same */}
            <Bar
              dataKey="current"
              fill="#93C5FD" // Consider adjusting colors if desired
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="prospective"
              fill="#C4B5FD" // Consider adjusting colors if desired
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="gap"
              fill="#1E3A8A10" // Consider adjusting colors if desired
              stroke="#1E3A8A"
              strokeWidth={2}
              strokeDasharray="5 5"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Updated Caption */}
      <p className="text-xs text-gray-500 mt-1 text-center">
        Significant demand exists for skilled trades professionals like Auto
        Technicians and Welders.
      </p>
    </div>
  );
};

export default SupplyDemandChart;
