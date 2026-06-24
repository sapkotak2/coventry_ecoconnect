import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BusinessService from "../services/businessServices";
import type { Business } from "../types/Business";

export default function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    BusinessService.getAll()
      .then(response => {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching businesses:", error);
        setError("Failed to load businesses. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading businesses...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Eco Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map(business => (
          <div key={business.businessId} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-bold">{business.businessName}</h3>
            <span className="text-sm text-gray-500">{business.businessCategory}</span>
            <p className="text-sm text-gray-600 mt-2">{business.businessDescription}</p>
            <p className="text-sm text-gray-500 mt-1">{business.businessAddress}</p>
            <p className="text-sm font-semibold mt-1">Rating: {business.businessRating} / 5</p>
            <Link
              to={`/businesses/${business.businessId}`}
              className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}