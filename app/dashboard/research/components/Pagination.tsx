interface Props {
  page: number;
  setPage: (p: number) => void;
}

export default function Pagination({ page, setPage }: Props) {
  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span>Page {page}</span>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
