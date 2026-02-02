"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Terima prop 'data' dari parent
export function PipelineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // Format angka di sumbu Y (misal: 10M)
          tickFormatter={(value) => `${value}M`}
        />
        <Tooltip
          cursor={{ fill: "#f1f5f9" }}
          contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          // Format angka di tooltip (Rp 10.5 Milyar)
          formatter={(value) => [`Rp ${value} Milyar`, "Total Nilai"]}
        />
        <Bar
          dataKey="total"
          fill="#f59e0b" // Amber-500
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
