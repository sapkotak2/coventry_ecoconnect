import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BusinessService from "../services/businessServices";
import ReviewService from "../services/reviewService";
import type { Business } from "../types/Business";
import type { Review } from "../types/Review";

// business with review count and average rating
type BusinessStats = {
  business: Business;
  count: number;
  average: number;
};

type ReviewWithName = Review & { businessName: string };

export default function Reviews() {
  const [stats, setStats] = useState<BusinessStats[]>([]);
  const [latest, setLatest] = useState<ReviewWithName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load all businesses and their reviews on mount
  useEffect(() => {
    const load = async () => {
      try {
        // get all businesses
        const businessRes = await BusinessService.getAll();
        const businesses = businessRes.data;

        const statList: BusinessStats[] = [];
        const allReviews: ReviewWithName[] = [];

        // for each business get its reviews and calculate average
        await Promise.all(
          businesses.map(async business => {
            try {
              const reviewRes = await ReviewService.getByBusiness(business.businessId);
              const reviews = reviewRes.data;

              const count = reviews.length;
              const average =
                count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

              statList.push({ business, count, average });

            
              reviews.forEach(r =>
                allReviews.push({ ...r, businessName: business.businessName })
              );
            } catch {
              statList.push({ business, count: 0, average: 0 });
            }
          })
        );

        // sort reviews newest first
        allReviews.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setStats(statList);
        setLatest(allReviews.slice(0, 8));
        setLoading(false);
      } catch (err) {
        console.error("Error loading reviews page:", err);
        setError("Failed to load reviews. Please try again.");
        setLoading(false);
      }
    };
    load();
  }, []);


  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(value) ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));

  // get initials from email
  const initials = (email: string) => {
    if (!email) return "?";
    const name = email.split("@")[0];
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) return <div className="bg-stone-50 min-h-screen p-10 text-gray-500">Loading reviews...</div>;
  if (error) return <div className="bg-stone-50 min-h-screen p-10 text-red-500">{error}</div>;

  // sort by most and least reviewed
  const mostReviewed = [...stats].sort((a, b) => b.count - a.count).slice(0, 3);
  const leastReviewed = [...stats].sort((a, b) => a.count - b.count).slice(0, 3);

  // each business stat
  const StatCard = ({ s }: { s: BusinessStats }) => (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-gray-900">{s.business.businessName}</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
          {s.count} review{s.count !== 1 ? "s" : ""}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{s.business.businessCategory}</p>
      <div className="flex items-center gap-2 mt-2 text-sm">
        <span>{renderStars(s.average)}</span>
        <span className="text-gray-600 font-medium">
          {s.count > 0 ? `${s.average.toFixed(1)} / 5` : "No rating yet"}
        </span>
      </div>
      <Link
        to={`/businesses/${s.business.businessId}`}
        className="mt-4 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-green-700 transition"
      >
        View Details
      </Link>
    </div>
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* page heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Community Reviews</h1>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            See which eco-businesses the community is talking about and read what others have said.
          </p>
        </div>

        {/* most reviewed section */}
        <section className="mb-14">
          <h2 className="text-center text-lg md:text-xl font-bold flex items-center justify-center gap-2 mb-6">
            Most reviewed places
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mostReviewed.map(s => <StatCard key={s.business.businessId} s={s} />)}
          </div>
        </section>

        {/* least reviewed section */}
        <section className="mb-14">
          <h2 className="text-center text-lg md:text-xl font-bold flex items-center justify-center gap-2 mb-2">
            Needs more reviews
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            These places have the fewest reviews be the first to share your experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leastReviewed.map(s => <StatCard key={s.business.businessId} s={s} />)}
          </div>
        </section>

        {/* latest reviews  */}
        <section>
          <h2 className="text-center text-lg md:text-xl font-bold flex items-center justify-center gap-2 mb-6">
            Latest reviews
          </h2>

          {latest.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">No reviews have been posted yet.</p>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {latest.map(review => (
                <Link
                  key={review.reviewId}
                  to={`/businesses/${review.businessId}`}
                  className="block bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center flex-shrink-0">
                      {initials(review.userEmail)}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* business name and date */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{review.businessName}</span>
                        <span className="text-xs text-gray-400 italic whitespace-nowrap">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>

                      {/* stars */}
                      <div className="text-sm mt-0.5">{renderStars(review.rating)}</div>

                      {/* comment */}
                      <p className="text-gray-700 text-sm mt-2">"{review.comment}"</p>

                      {/* author */}
                      <span className="text-xs text-gray-500 mt-2 block">
                        {review.userEmail.split("@")[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}