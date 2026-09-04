export default function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "12px" }}>
      {title && <h4 style={{ marginTop: 0 }}>{title}</h4>}
      {children}
    </div>
  );
}
