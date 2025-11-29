interface Props {
  results: any[];
}

export default function WorksList({ results }: Props) {
  if (results.length === 0) return <p>No results found</p>;

  return (
    <div>
      {results.map((work) => (
        <div
          key={work.id}
          style={{
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
            background: "white",
          }}
        >
          <h3>{work.title}</h3>
          <p><strong>Year:</strong> {work.publication_year}</p>
          <p><strong>Venue:</strong> {work.host_venue?.display_name || "N/A"}</p>

          <a href={work.id} target="_blank">Open in OpenAlex</a>
        </div>
      ))}
    </div>
  );
}
