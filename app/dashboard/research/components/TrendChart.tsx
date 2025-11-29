"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function TrendChart({ yearData }: any) {
  if (!yearData || yearData.length === 0) return <p>No data</p>;

  const labels = yearData.map((y: any) => y.key);
  const values = yearData.map((y: any) => y.count);

  return (
    <div style={{ marginBottom: "30px" }}>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Publications per Year",
              data: values,
              borderColor: "blue",
              backgroundColor: "lightblue",
            },
          ],
        }}
      />
    </div>
  );
}
