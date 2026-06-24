import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BusinessService from "../services/businessServices";
import type { Business } from "../types/Business";

export default function Business() {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    BusinessService.get(id)
      .then(response => {
        setBusiness(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching business:", error);
        setError("Business not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading business...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  if (!business) return null;

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Back link */}
      <Link
        to="/businesses"
        className="text-green-600 hover:underline text-sm font-medium"
      >
        ← Back to all businesses
      </Link>

      {/* Main card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Green header banner */}
        <div className="bg-green-600 px-8 py-10">
          <span className="text-green-200 text-sm font-semibold uppercase tracking-widest">
            {business.businessCategory}
          </span>
          <h1 className="text-white text-4xl font-bold mt-2">
            {business.businessName}
          </h1>
          {/* Stars and rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="text-xl">{renderStars(business.businessRating)}</div>
            <span className="text-green-100 text-sm font-medium">
              {business.businessRating} / 5
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-6">

          {/* Description */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              About
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {business.businessDescription}
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Address */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Location
            </h2>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">📍</span>
              <p className="text-gray-700">{business.businessAddress}</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Category */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Category
            </h2>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full">
              {business.businessCategory}
            </span>
          </div>

          <hr className="border-gray-100" />

          {/* Rating bar */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Rating
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${(business.businessRating / 5) * 100}%` }}
                />
              </div>
              <span className="text-gray-700 font-bold text-sm">
                {business.businessRating} / 5
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}