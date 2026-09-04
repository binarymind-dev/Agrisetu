export default function PriceTable({ prices = [] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Crop</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Market</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Modal Price</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((p, i) => (
          <tr key={i}>
            <td>{p.crop}</td>
            <td>{p.market_name}</td>
            <td>{p.price_modal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
