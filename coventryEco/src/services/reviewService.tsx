import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Review } from '../types/Review';

const http = axios.create({
  baseURL: "https://cyd48csxk0.execute-api.us-east-1.amazonaws.com"
});

const getAuthHeader = async () => {
  const { idToken } = (await fetchAuthSession()).tokens ?? {};
  if (!idToken) throw new Error("User not authenticated");
  return {
    Authorization: `Bearer ${idToken.toString()}`,
    "Content-Type": "application/json"
  };
};

// GET /reviews/{businessId}
const getByBusiness = async (businessId: string) => {
  const headers = await getAuthHeader();
  return http.get<Review[]>(`/reviews/${businessId}`, { headers });
};

// POST /reviews  (email is added server-side from the token)
const create = async (data: { businessId: string; rating: number; comment: string }) => {
  const headers = await getAuthHeader();
  return http.post<Review>('/reviews', data, { headers });
};

// PUT /reviews
const update = async (data: { reviewId: string; rating: number; comment: string }) => {
  const headers = await getAuthHeader();
  return http.put<Review>('/reviews', data, { headers });
};

// DELETE /reviews/{reviewId}
const remove = async (reviewId: string) => {
  const headers = await getAuthHeader();
  return http.delete(`/reviews/${reviewId}`, { headers });
};

const ReviewService = { getByBusiness, create, update, remove };
export default ReviewService;