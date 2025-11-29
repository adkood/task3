interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search education research..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}
