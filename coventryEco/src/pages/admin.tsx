import React, { useEffect, useState } from 'react';
import BusinessService from '../services/businessServices';
import ReviewService from '../services/reviewService';
import type { Business } from '../types/Business';

// available categories
const CATEGORIES = [
  "Zero-waste shop",
  "Repair café",
  "Local food producer",
  "Sustainable fashion",
  "Composting",
  "Refill store",
  "Eco café",
  "Upcycling",
  "Renewable energy",
  "Community garden",
];

export default function BusinessAdmin() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});

  // form state
  const [current, setCurrent] = useState<Business>({
    businessId: "",
    businessName: "",
    businessDescription: "",
    businessCategory: "",
    businessAddress: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // load all businesses and their review counts
  const fetchBusinesses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await BusinessService.getAll();
      const list = response.data || [];
      setBusinesses(list);

      // get review count for each business
      const counts: Record<string, number> = {};
      await Promise.all(
        list.map(async b => {
          try {
            const reviewRes = await ReviewService.getByBusiness(b.businessId);
            counts[b.businessId] = reviewRes.data.length;
          } catch {
            counts[b.businessId] = 0;
          }
        })
      );
      setReviewCounts(counts);
    } catch {
      setError("Could not load businesses.");
    } finally {
      setIsLoading(false);
    }
  };

  // update form field on change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrent(prev => ({ ...prev, [name]: value }));
  };

  // check required fields before saving
  const validate = () => {
    if (!current.businessName.trim()) return "Business name is required.";
    if (!current.businessCategory) return "Please select a category.";
    if (!current.businessAddress.trim()) return "Address is required.";
    if (!current.businessDescription.trim()) return "Description is required.";
    return null;
  };

  // generate next business id e.g. b011
  const generateNextID = (): string => {
    if (businesses.length === 0) return "b001";
    const maxId = businesses.reduce((max, b) => {
      const num = parseInt(b.businessId.replace("b", ""), 10) || 0;
      return num > max ? num : max;
    }, 0);
    return "b" + (maxId + 1).toString().padStart(3, "0");
  };

  // save or update business
  const saveBusiness = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      let toSave = current;
      // generate id if new business
      if (!current.businessId) {
        toSave = { ...current, businessId: generateNextID() };
      }
      await BusinessService.put(toSave);
      alert("Business saved successfully.");
      await fetchBusinesses();
      resetForm();
    } catch {
      setError("Save failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // delete business
  const deleteBusiness = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this business?")) return;
    setIsLoading(true);
    try {
      await BusinessService.remove(id);
      alert("Business deleted.");
      await fetchBusinesses();
    } catch {
      setError("Failed to delete. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // load business into form for editing
  const editBusiness = (b: Business) => {
    setCurrent(b);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // clear the form
  const resetForm = () => {
    setCurrent({
      businessId: "",
      businessName: "",
      businessDescription: "",
      businessCategory: "",
      businessAddress: "",
    });
    setError(null);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* page heading */}
        <div className="text-center mb-8">
          <span className="inline-block text-green-700 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full mb-3">
            Admin
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Business Admin Panel</h1>
        </div>

        {/* error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-6 flex justify-between max-w-2xl mx-auto">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold">✕</button>
          </div>
        )}

        {/* add or edit form */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12 max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
            {current.businessId ? "Edit Business" : "Add New Business"}
          </h2>

          {/* name field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Business Name</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="businessName"
              type="text"
              value={current.businessName}
              onChange={handleInputChange}
              placeholder="e.g. Refill & Co"
            />
          </div>

          {/* category dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
            <select
              className="w-full border border-gray-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              name="businessCategory"
              value={current.businessCategory}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* address field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="businessAddress"
              type="text"
              value={current.businessAddress}
              onChange={handleInputChange}
              placeholder="e.g. 12 Far Gosford Street, Coventry"
            />
          </div>

          {/* description field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="businessDescription"
              rows={3}
              value={current.businessDescription}
              onChange={handleInputChange}
              placeholder="Describe the business..."
            />
          </div>

          {/* save and clear buttons */}
          <div className="flex gap-3">
            <button
              onClick={saveBusiness}
              disabled={isLoading}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition"
            >
              {current.businessId ? "Update" : "Save"}
            </button>
            <button
              onClick={resetForm}
              className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Clear Form
            </button>
          </div>
        </div>

        {/* all businesses list */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">All Businesses</h2>

        {isLoading && businesses.length === 0 ? (
          <p className="text-center text-gray-500">Loading businesses...</p>
        ) : businesses.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-3 text-center">
            No businesses available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map(b => (
              <div key={b.businessId} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">

                {/* name and review count */}
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-900">{b.businessName}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                    {reviewCounts[b.businessId] || 0} review{reviewCounts[b.businessId] !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* category */}
                <p className="text-xs text-gray-500 mt-1">{b.businessCategory}</p>

                {/* description */}
                <p className="text-sm text-gray-600 mt-3 flex-1">{b.businessDescription}</p>

                {/* address */}
                <p className="text-xs text-gray-500 mt-3">{b.businessAddress}</p>

                {/* edit and delete buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => editBusiness(b)}
                    className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBusiness(b.businessId)}
                    className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}