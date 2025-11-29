"use client";
import React, { useEffect, useState } from "react";
import { buildWorksUrl } from "../lib/openalex";

export default function DrillDownModal({
  kind,
  idOrKey,
  displayName,
  onClose,
}: {
  kind: "venue" | "institution";
  idOrKey: string;
  displayName?: string;
  onClose: () => void;
}) {
  const [works, setWorks] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const filterKey = kind === "venue" ? "host_venue.id" : "authorships.institutions.id";
        const base = "https://api.openalex.org/works";
        const url = `${base}?filter=${encodeURIComponent(filterKey + ":" + idOrKey)}&sort=cited_by_count:desc&per_page=10`;
        const res = await fetch(url);
        const j = await res.json();
        setWorks(j.results || []);
      } catch (err) {
        console.error(err);
        setWorks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [idOrKey, kind]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{displayName || idOrKey} — top works</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div style={{ marginTop: 12 }}>
          {loading && <div>Loading...</div>}
          {!loading && works && works.length === 0 && <div>No works found</div>}
          {!loading && works &&
            works.map((w: any) => (
              <div key={w.id} className="work" style={{ padding: 10 }}>
                <h4><a href={w.id} target="_blank" rel="noreferrer">{w.title}</a></h4>
                <p className="muted small">{w.authorships?.slice(0,3).map((a:any)=>a.author?.display_name).filter(Boolean).join(", ")} • {w.publication_year} • {w.cited_by_count} cites</p>
              </div>
            ))
          }
        </div>

        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
