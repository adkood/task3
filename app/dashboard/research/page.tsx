"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function ResearchPage() {
  const [query, setQuery] = useState("education assessment");
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [yearData, setYearData] = useState<any[]>([]);
  const [oaData, setOAData] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [institutions, setInstitutions] = useState<any[]>([]);

  console.log(oaData);
  console.log(venues);

  useEffect(() => {
    fetchWorks();
    fetchAggregations();
  }, [query, page]);

  async function fetchWorks() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=20&page=${page}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function fetchAggregations() {
    try {
      const yearRes = await fetch(
        `https://api.openalex.org/works?search=${encodeURIComponent(query)}&group_by=publication_year`
      );
      const yearJson = await yearRes.json();
      setYearData(yearJson.group_by || []);

      const oaRes = await fetch(
        `https://api.openalex.org/works?search=${encodeURIComponent(query)}&group_by=oa_status`
      );
      const oaJson = await oaRes.json();
      setOAData(oaJson.group_by || []);

      const venueRes = await fetch(
        `https://api.openalex.org/works?search=${encodeURIComponent(query)}&group_by=host_venue.id`
      );
      const venueJson = await venueRes.json();
      setVenues(venueJson.group_by || []);

      const instRes = await fetch(
        `https://api.openalex.org/works?search=${encodeURIComponent(query)}&group_by=authorships.institutions.id`
      );
      const instJson = await instRes.json();
      setInstitutions(instJson.group_by || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", maxWidth: "900px", margin: "0 auto", backgroundColor: "#f5f7fa", borderRadius: "10px" }}>
      <h1 style={{ textAlign: "center", color: "#2b6cb0", marginBottom: "30px" }}>📚 Education Research Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search education topics..."
          style={{ padding: "10px", width: "320px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#3182ce" }}>📈 Yearly Publication Trend</h2>
        <div style={{ width: "100%", maxWidth: "700px", height: "300px", margin: "20px auto" }}>
          {yearData.length > 0 ? (
            <Line
              data={{
                labels: yearData.map((y: any) => y.key),
                datasets: [
                  {
                    label: "Publications per Year",
                    data: yearData.map((y: any) => y.count),
                    borderColor: "#3182ce",
                    backgroundColor: "rgba(49,130,206,0.2)",
                    tension: 0.3,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <p style={{ textAlign: "center" }}>No data</p>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#38a169" }}>🟢 Open Access Breakdown</h2>
        <div style={{ width: "100%", maxWidth: "400px", height: "300px", margin: "20px auto" }}>
          {oaData.length > 0 ? (
            <Pie
              data={{
                labels: oaData.map((o: any) => o.key),
                datasets: [
                  {
                    data: oaData.map((o: any) => o.count),
                    backgroundColor: ["#38a169", "#dd6b20", "#718096"],
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <p style={{ textAlign: "center" }}>No data</p>
          )}
        </div>
      </div>

      {/* <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#d53f8c" }}>🏛️ Top Venues</h2>
        {venues.length > 0 ? (
          <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", margin: "0 auto", width: "80%", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f7fafc" }}>
              <tr>
                <th>Venue Name</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {venues.slice(0, 10).map((v: any) => (
                <tr key={v.key}>
                  <td>{v.key}</td>
                  <td>{v.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>No data</p>
        )}
      </div> */}

      {/* TOP INSTITUTIONS */}
      <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#dd6b20" }}>🏫 Top Institutions</h2>
        {institutions.length > 0 ? (
          <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", margin: "0 auto", width: "80%", textAlign: "center" }}>
            <thead style={{ backgroundColor: "#f7fafc" }}>
              <tr>
                <th>Institution Name</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {institutions.slice(0, 10).map((i: any) => (
                <tr key={i.key}>
                  <td>{i.key_display_name}</td>
                  <td>{i.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>No data</p>
        )}
      </div>

      {/* WORKS LIST */}
      <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#805ad5" }}>📄 Works</h2>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : results.length > 0 ? (
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {results.map((r: any) => (
              <li key={r.id} style={{ marginBottom: "12px", padding: "8px", borderBottom: "1px solid #eee" }}>
                <a href={r.id} target="_blank" rel="noopener noreferrer" style={{ color: "#2b6cb0", textDecoration: "none", fontWeight: "500" }}>
                  {r.display_name}
                </a>{" "}
                <span style={{ color: "#718096" }}>({r.publication_year}) — {r.cited_by_count} citations</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center" }}>No results</p>
        )}
      </div>

      {/* PAGINATION */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} style={{ marginRight: "10px", padding: "8px 12px", borderRadius: "5px", border: "none", backgroundColor: "#3182ce", color: "white", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)} style={{ padding: "8px 12px", borderRadius: "5px", border: "none", backgroundColor: "#38a169", color: "white", cursor: "pointer" }}>
          Next
        </button>
        <span style={{ marginLeft: "10px", fontWeight: "500" }}>Page {page}</span>
      </div>
    </div>
  );
}
