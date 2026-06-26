import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import BusinessService from "../services/businessServices";
import ReviewService from "../services/reviewService";
import type { Business } from "../types/Business";
import type { Review } from "../types/Review";

export default function Business() {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [myEmail, setMyEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // load business on mount
  useEffect(() => {
    if (!id) return;
    BusinessService.get(id)
      .then(response => { setBusiness(response.data); setLoading(false); })
      .catch(err => { console.error(err); setError("Business not found."); setLoading(false); });
  }, [id]);

  // get logged in user email
  useEffect(() => {
    fetchUserAttributes()
      .then(attrs => setMyEmail(attrs.email || ""))
      .catch(() => setMyEmail(""));
  }, []);

  // load reviews for this business
  const loadReviews = () => {
    if (!id) return;
    ReviewService.getByBusiness(id)
      .then(response => setReviews(response.data))
      .catch(err => console.error("Error loading reviews:", err));
  };
  useEffect(() => { loadReviews(); }, [id]);

  // calculate live average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // submit or update a review
  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please choose a star rating and write a comment.");
      return;
    }
    try {
      if (editingId) {
        // update existing review
        await ReviewService.update({ reviewId: editingId, rating, comment });
      } else if (id) {
        // add new review
        await ReviewService.create({ businessId: id, rating, comment });
      }
      setRating(0); setComment(""); setEditingId(null);
      loadReviews();
    } catch (err) {
      console.error("Error saving review:", err);
      alert("Could not save your review.");
    }
  };

  // load review into form for editing
  const startEdit = (review: Review) => {
    setEditingId(review.reviewId);
    setRating(review.rating);
    setComment(review.comment);
  };

  // delete review
  const handleDelete = async (reviewId: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await ReviewService.remove(reviewId);
      loadReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // render stars based on rating
  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(value) ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));

  // get initials from email
  const initials = (email: string) => {
    if (!email) return "?";
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  if (loading) return <div className="bg-stone-50 min-h-screen p-10 text-gray-500">Loading business...</div>;
  if (error) return <div className="bg-stone-50 min-h-screen p-10 text-red-500">{error}</div>;
  if (!business) return null;

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* back link */}
        <Link to="/businesses" className="text-green-600 hover:underline text-sm font-medium">
          Back to all businesses
        </Link>

        {/* business card */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">

       
          <div className="bg-green-600 px-8 py-10 text-center">
            <span className="inline-block bg-green-500/30 text-green-100 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {business.businessCategory}
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">
              {business.businessName}
            </h1>
            {/* live rating */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="text-xl">{renderStars(averageRating)}</div>
              <span className="text-green-100 text-sm font-medium">
                {reviews.length > 0
                  ? `${averageRating.toFixed(1)} / 5 (${reviews.length} review${reviews.length > 1 ? "s" : ""})`
                  : "No reviews yet"}
              </span>
            </div>
          </div>

          {/* about and location */}
          <div className="px-8 py-8 space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">{business.businessDescription}</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location</h2>
              <p className="text-gray-700">{business.businessAddress}</p>
            </div>
          </div>
        </div>

        {/* reviews section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            Reviews ({reviews.length})
          </h2>

          {/* write or edit review form */}
          <div className="bg-stone-50 rounded-xl p-6 mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              {editingId ? "Edit your review" : "Write a review"}
            </p>

            {/* star selector */}
            <div className="flex gap-1 mb-4 text-3xl">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={n <= rating ? "text-yellow-400" : "text-gray-300"}
                >
                  ★
                </button>
              ))}
            </div>

            {/* comment box */}
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Share your experience…"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              rows={3}
            />

            {/* submit or cancel */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition"
              >
                {editingId ? "Update review" : "Submit review"}
              </button>
              {editingId && (
                <button
                  onClick={() => { setEditingId(null); setRating(0); setComment(""); }}
                  className="text-gray-500 text-sm hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* review list */}
          {reviews.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.reviewId} className="bg-stone-50 rounded-xl p-5">
                  <div className="flex items-start gap-4">

                    {/* avatar */}
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center flex-shrink-0">
                      {initials(review.userEmail)}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* username and date */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">
                          {review.userEmail.split("@")[0]}
                        </span>
                        <span className="text-xs text-gray-400 italic whitespace-nowrap">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>

                      {/* stars */}
                      <div className="text-sm mt-0.5">{renderStars(review.rating)}</div>

                      {/* comment */}
                      <p className="text-gray-700 text-sm mt-2">"{review.comment}"</p>

                      {/* edit and delete only shown to author */}
                      {review.userEmail === myEmail && (
                        <div className="flex gap-4 mt-3">
                          <button
                            onClick={() => startEdit(review)}
                            className="text-green-600 text-xs font-medium hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(review.reviewId)}
                            className="text-red-500 text-xs font-medium hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}