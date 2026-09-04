export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  const styles = {
    primary: { background: "#2e7d32", color: "#fff" },
    secondary: { background: "#eee", color: "#333" }
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", ...styles[variant] }}
    >
      {children}
    </button>
  );
}
