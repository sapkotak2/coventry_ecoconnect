import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BusinessService from "../services/businessServices";
import ReviewService from "../services/reviewService";
import type { Business } from "../types/Business";

// live rating info for each business
type RatingInfo = { average: number; count: number };

export default function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [ratings, setRatings] = useState<Record<string, RatingInfo>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load businesses and reviews on mount
  useEffect(() => {
    BusinessService.getAll()
      .then(async response => {
        const list = response.data;
        setBusinesses(list);

        // for each business get reviews and calculate average
        const ratingMap: Record<string, RatingInfo> = {};
        await Promise.all(
          list.map(async business => {
            try {
              const reviewRes = await ReviewService.getByBusiness(business.businessId);
              const reviews = reviewRes.data;
              if (reviews.length > 0) {
                const total = reviews.reduce((sum, r) => sum + r.rating, 0);
                ratingMap[business.businessId] = {
                  average: total / reviews.length,
                  count: reviews.length,
                };
              } else {
                ratingMap[business.businessId] = { average: 0, count: 0 };
              }
            } catch {
              ratingMap[business.businessId] = { average: 0, count: 0 };
            }
          })
        );
        setRatings(ratingMap);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching businesses:", error);
        setError("Failed to load businesses. Please try again.");
        setLoading(false);
      });
  }, []);


  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(value) ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));

  // unique category list from businesses
  const categories = ["All", ...Array.from(new Set(businesses.map(b => b.businessCategory)))];

  // filter by selected category
  const visible = selectedCategory === "All"
    ? businesses
    : businesses.filter(b => b.businessCategory === selectedCategory);

  if (loading) return <div className="bg-stone-50 min-h-screen p-10 text-gray-500">Loading businesses...</div>;
  if (error) return <div className="bg-stone-50 min-h-screen p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* page heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Eco Businesses</h1>
          <p className="text-gray-600 mt-2">
            Every listing is a local business making Coventry a little greener.
          </p>
        </div>

        {/*  filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* business cards */}
        {visible.length === 0 ? (
          <p className="text-center text-gray-500">No businesses in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(business => {
              const rating = ratings[business.businessId];
              return (
                <div
                  key={business.businessId}
                  className="bg-white rounded-2xl shadow-sm p-6 flex flex-col"
                >
                  {/* name and review count */}
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900">{business.businessName}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                      {rating?.count || 0} review{rating?.count !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* category */}
                  <p className="text-xs text-gray-500 mt-1">{business.businessCategory}</p>

                  {/* description */}
                  <p className="text-sm text-gray-600 mt-3 flex-1">
                    {business.businessDescription}
                  </p>

                  {/* address */}
                  <p className="text-xs text-gray-500 mt-3">{business.businessAddress}</p>

                  {/* live rating */}
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span>{renderStars(rating?.average || 0)}</span>
                    <span className="text-gray-600 font-medium">
                      {rating && rating.count > 0
                        ? `${rating.average.toFixed(1)} / 5 (${rating.count} review${rating.count > 1 ? "s" : ""})`
                        : <span className="text-gray-500">No rating yet (0 reviews)</span>}
                    </span>
                  </div>

                  {/* view details button */}
                  <Link
                    to={`/businesses/${business.businessId}`}
                    className="mt-5 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-green-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}