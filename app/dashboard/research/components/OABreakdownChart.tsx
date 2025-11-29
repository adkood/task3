"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OABreakdownChart({ oaData }: any) {
  if (!oaData || oaData.length === 0) return <p>No data</p>;

  const labels = oaData.map((o: any) => o.key_display_name);
  const values = oaData.map((o: any) => o.count);

  return (
    <div style={{ width: "300px", marginBottom: "40px" }}>
      <Pie
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ["green", "orange", "gray"],
            },
          ],
        }}
      />
    </div>
  );
}
