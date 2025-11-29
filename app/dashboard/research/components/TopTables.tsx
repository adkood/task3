"use client";
import React from "react";

export type GroupRow = {
  key: string; 
  display_name?: string;
  count: number;
  id?: string;
};

export default function TopTables({
  venues,
  institutions,
  onOpenVenue,
  onOpenInstitution,
}: {
  venues: GroupRow[];
  institutions: GroupRow[];
  onOpenVenue: (venue: GroupRow) => void;
  onOpenInstitution: (inst: GroupRow) => void;
}) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Top Venues</h3>
        <table className="table">
          <tbody>
            {venues.slice(0, 8).map((v, i) => (
              <tr key={v.key}>
                <td style={{ width: 36 }}>{i + 1}.</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{v.display_name || v.key}</div>
                  <div className="muted small">{v.key}</div>
                </td>
                <td style={{ width: 90 }}>{v.count}</td>
                <td style={{ width: 120 }}>
                  <button onClick={() => onOpenVenue(v)}>View works</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Top Institutions</h3>
        <table className="table">
          <tbody>
            {institutions.slice(0, 8).map((v, i) => (
              <tr key={v.key}>
                <td style={{ width: 36 }}>{i + 1}.</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{v.display_name || v.key}</div>
                  <div className="muted small">{v.key}</div>
                </td>
                <td style={{ width: 80 }}>{v.count}</td>
                <td style={{ width: 120 }}>
                  <button onClick={() => onOpenInstitution(v)}>View works</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
