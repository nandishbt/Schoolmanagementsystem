import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StudentGenderChart = ({ maleCount, femaleCount }) => {
  const data = [
    { gender: "Male", count: maleCount },
    { gender: "Female", count: femaleCount },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="gender" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentGenderChart;
