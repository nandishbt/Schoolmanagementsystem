import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const FinancialChart = ({ salaries, studentFees }) => {
  const data = [
    { name: "Teachers' Salaries", value: salaries },
    { name: "Student Fees (Income)", value: studentFees },
  ];

  const COLORS = ["#EF4444", "#10B981"]; // Red for expenses, Green for income

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
