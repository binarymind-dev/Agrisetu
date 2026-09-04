import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Card from "../../components/Card.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function BrowseListings() {
  const { t } = useLanguage();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/listings")
      .then((res) => setListings(res.data))
      .catch((err) => console.error("Failed to load listings:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>{t("browse_listings")}</h3>
      {loading && <p>Loading...</p>}
      {!loading && listings.length === 0 && <p>No listings available.</p>}
      {listings.map((listing) => (
        <Card key={listing.id} title={listing.crop}>
          <p>
            {t("quantity")}: {listing.quantity} {listing.unit}
          </p>
          <p>Quality: {listing.quality_grade || "N/A"}</p>
          <p>Location: {listing.location}</p>
          <Link to={`/buyer/offer/${listing.id}`}>{t("make_offer")}</Link>
        </Card>
      ))}
    </div>
  );
}
