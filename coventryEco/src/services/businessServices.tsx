import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Business } from '../types/Business';

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

// get all businesses
const getAll = async () => {
    const headers = await getAuthHeader();
    return http.get<Business[]>('/businesses', { headers });
};

// get one business
const get = async (id: string) => {
    const headers = await getAuthHeader();
    return http.get<Business>(`/businesses/${id}`, { headers });
};

// add or update business
const put = async (data: Business) => {
    const headers = await getAuthHeader();
    return http.put('/businesses', data, { headers });
};

// delete business
const remove = async (id: string) => {
    const headers = await getAuthHeader();
    return http.delete(`/businesses/${id}`, { headers });
};

const BusinessService = {
    getAll,
    get,
    put,
    remove
};

export default BusinessService;