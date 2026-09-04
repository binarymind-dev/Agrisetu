import { useState } from "react";
import Card from "../../components/Card.jsx";
import Button from "../../components/Button.jsx";

export default function DataFeedMonitor() {
  const [status, setStatus] = useState("idle");

  const triggerRefresh = () => {
    setStatus("refreshing");
    setTimeout(() => setStatus("done"), 1500);
  };

  return (
    <div>
      <h3>Data Feed Monitor</h3>
      <Card title="Agmarknet / eNAM Ingestion">
        <p>Last sync status: {status}</p>
        <Button onClick={triggerRefresh} disabled={status === "refreshing"}>
          {status === "refreshing" ? "Refreshing..." : "Trigger Manual Refresh"}
        </Button>
      </Card>
    </div>
  );
}
