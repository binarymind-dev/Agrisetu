import { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function OrderHistory() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders", { params: { userId: user?.id } })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to load orders:", err))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      <h3>{t("order_history")}</h3>
      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order) => (
        <Card key={order.id} title={`Order #${order.id}`}>
          <p>Status: {order.status}</p>
          <p>Payment Ref: {order.payment_reference || "N/A"}</p>
        </Card>
      ))}
    </div>
  );
}
