import { useState } from "react";
import Card from "../../components/Card.jsx";
import Button from "../../components/Button.jsx";

const sampleDisputes = [
  { id: 1, listing: "Wheat - 200kg", reason: "Quality mismatch", status: "open" },
  { id: 2, listing: "Onion - 500kg", reason: "Payment delay", status: "open" }
];

export default function DisputePanel() {
  const [disputes, setDisputes] = useState(sampleDisputes);

  const resolveDispute = (id) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "resolved" } : d))
    );
  };

  return (
    <div>
      <h3>Dispute Panel</h3>
      {disputes.map((d) => (
        <Card key={d.id} title={d.listing}>
          <p>Reason: {d.reason}</p>
          <p>Status: {d.status}</p>
          {d.status === "open" && (
            <Button onClick={() => resolveDispute(d.id)}>Mark Resolved</Button>
          )}
        </Card>
      ))}
    </div>
  );
}
