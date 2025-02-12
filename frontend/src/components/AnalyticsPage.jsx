import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const [view, setView] = useState("monthly");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2024");
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2022", "2023", "2024", "2025"];

  const data = [
    { name: "Week 1", Salaries: 4000, Income: 6000 },
    { name: "Week 2", Salaries: 4200, Income: 6200 },
    { name: "Week 3", Salaries: 3800, Income: 5900 },
    { name: "Week 4", Salaries: 4500, Income: 6500 },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-3">
          <span>Monthly</span>
          <input type="checkbox" checked={view === "yearly"} onChange={() => setView(view === "monthly" ? "yearly" : "monthly")} />
          <span>Yearly</span>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        {view === "monthly" && (
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 border rounded">
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
        
        <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded">
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      
      <div className="border p-4 rounded-lg shadow-md bg-white">
        <p className="text-lg">Displaying {view} analytics for {view === "monthly" ? `${month}, ` : ""}{year}</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Salaries" stroke="#8884d8" />
            <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
