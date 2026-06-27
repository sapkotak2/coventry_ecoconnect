import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BusinessService from "../services/businessServices";
import ReviewService from "../services/reviewService";
import type { Business } from "../types/Business";

// business with live rating data
type BusinessWithRating = Business & {
  average: number;
  reviewCount: number;
};

export default function Home() {
  const [topBusinesses, setTopBusinesses] = useState<BusinessWithRating[]>([]);
  const [stats, setStats] = useState({ businesses: 0, reviews: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  // load businesses and reviews on mount
  useEffect(() => {
    const load = async () => {
      try {
        // get all businesses
        const businessRes = await BusinessService.getAll();
        const businesses = businessRes.data;

        // for each business get reviews and calculate average rating
        const enriched: BusinessWithRating[] = await Promise.all(
          businesses.map(async business => {
            try {
              const reviewRes = await ReviewService.getByBusiness(business.businessId);
              const reviews = reviewRes.data;
              const average = reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;
              return { ...business, average, reviewCount: reviews.length };
            } catch {
              return { ...business, average: 0, reviewCount: 0 };
            }
          })
        );

        // get top 3 by rating
        const top = [...enriched]
          .filter(b => b.reviewCount > 0)
          .sort((a, b) => b.average - a.average)
          .slice(0, 3);

     
        if (top.length < 3) {
          const filler = enriched
            .filter(b => b.reviewCount === 0)
            .slice(0, 3 - top.length);
          top.push(...filler);
        }

        // calculate page 
        const totalReviews = enriched.reduce((sum, b) => sum + b.reviewCount, 0);
        const uniqueCategories = new Set(businesses.map(b => b.businessCategory)).size;

        setTopBusinesses(top);
        setStats({
          businesses: businesses.length,
          reviews: totalReviews,
          categories: uniqueCategories,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading home page:", err);
        setLoading(false);
      }
    };
    load();
  }, []);

  // user stars based on rating
  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(value) ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));

  return (
    <div className="bg-stone-50 min-h-screen">

   
      <section className="max-w-5xl mx-auto px-6 pt-10">
        <div className="bg-white rounded-3xl shadow-sm p-10 md:p-16 text-center">

          {/* location  */}
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1 rounded-full mb-6">
            Coventry & Warwickshire
          </span>

        
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover the eco-businesses<br />on your doorstep
          </h1>

        
          <p className="text-gray-600 mt-5 max-w-xl mx-auto">
            Find, review and support local zero-waste shops, organic growers and green services across Coventry.
          </p>

         
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link
              to="/businesses"
              className="bg-green-600 text-white font-semibold px-7 py-3 rounded-full hover:bg-green-700 transition"
            >
              Browse businesses
            </Link>
            <Link
              to="/reviews"
              className="bg-white border border-gray-200 text-gray-700 font-semibold px-7 py-3 rounded-full hover:bg-gray-50 transition"
            >
              Read reviews
            </Link>
          </div>

          {/* live status */}
          <div className="flex justify-center gap-12 md:gap-20 mt-10">
            <div>
              <p className="text-3xl font-bold text-green-700">{stats.businesses}</p>
              <p className="text-xs text-gray-500 mt-1">Businesses listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">{stats.reviews}+</p>
              <p className="text-xs text-gray-500 mt-1">Community reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">{stats.categories}</p>
              <p className="text-xs text-gray-500 mt-1">Categories</p>
            </div>
          </div>

        </div>
      </section>

      {/* top rated businesses */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            Top rated this month
          </h2>
          <Link to="/businesses" className="text-green-600 text-sm font-medium hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading businesses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topBusinesses.map(business => (
              <div key={business.businessId} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">

                {/* business name and review count */}
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-900">{business.businessName}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {business.reviewCount} review{business.reviewCount !== 1 ? "s" : ""}
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

                {/*  rating */}
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span>{renderStars(business.average)}</span>
                  <span className="text-gray-600">
                    {business.reviewCount > 0
                      ? `${business.average.toFixed(1)} / 5 (${business.reviewCount} review${business.reviewCount !== 1 ? "s" : ""})`
                      : "No reviews yet"}
                  </span>
                </div>

                {/* view details button */}
                <Link
                  to={`/businesses/${business.businessId}`}
                  className="mt-4 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-green-700 transition"
                >
                  View Details
                </Link>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}