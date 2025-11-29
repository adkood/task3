"use client";

import React from "react";
import { OAFilter, SortOption } from "../lib/types";

export default function Filters({
  yearFrom,
  yearTo,
  setYearFrom,
  setYearTo,
  oa,
  setOa,
  sort,
  setSort,
}: {
  yearFrom?: number;
  yearTo?: number;
  setYearFrom: (n?: number) => void;
  setYearTo: (n?: number) => void;
  oa: OAFilter;
  setOa: (o: OAFilter) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
}) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Filters</h3>

      <div style={{ marginBottom: 8 }}>
        <label className="small muted">Year from</label>
        <input className="input" type="number" value={yearFrom ?? ""} onChange={(e)=>setYearFrom(e.target.value ? Number(e.target.value) : undefined)} placeholder="2015" />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label className="small muted">Year to</label>
        <input className="input" type="number" value={yearTo ?? ""} onChange={(e)=>setYearTo(e.target.value ? Number(e.target.value) : undefined)} placeholder="2025" />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label className="small muted">Open access</label>
        <select className="input" value={oa} onChange={(e)=>setOa(e.target.value as OAFilter)}>
          <option value="all">All</option>
          <option value="oa_only">OA only</option>
          <option value="non_oa">Non-OA</option>
        </select>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label className="small muted">Sort</label>
        <select className="input" value={sort} onChange={(e)=>setSort(e.target.value as SortOption)}>
          <option value="relevance">Relevance</option>
          <option value="cited">Citations (desc)</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}
