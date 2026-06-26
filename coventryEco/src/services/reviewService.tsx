import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Review } from '../types/Review';

// api base url
const http = axios.create({
  baseURL: "https://cyd48csxk0.execute-api.us-east-1.amazonaws.com"
});

// get login token
const getAuthHeader = async () => {
  const { idToken } = (await fetchAuthSession()).tokens ?? {};
  if (!idToken) throw new Error("User not authenticated");
  return {
    Authorization: `Bearer ${idToken.toString()}`,
    "Content-Type": "application/json"
  };
};

// get all reviews for a business
const getByBusiness = async (businessId: string) => {
  const headers = await getAuthHeader();
  return http.get<Review[]>(`/reviews/${businessId}`, { headers });
};

// add review
const create = async (data: { businessId: string; rating: number; comment: string }) => {
  const headers = await getAuthHeader();
  return http.post<Review>('/reviews', data, { headers });
};

// update review
const update = async (data: { reviewId: string; rating: number; comment: string }) => {
  const headers = await getAuthHeader();
  return http.put<Review>('/reviews', data, { headers });
};

// delete review
const remove = async (reviewId: string) => {
  const headers = await getAuthHeader();
  return http.delete(`/reviews/${reviewId}`, { headers });
};

const ReviewService = { getByBusiness, create, update, remove };
export default ReviewService;