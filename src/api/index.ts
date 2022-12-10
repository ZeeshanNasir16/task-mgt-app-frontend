import axios from 'axios';

// * Development URLs
const baseURL = `http://localhost:5005/api`;

// * Production URLs
// const baseURL = `https://task-mgt.herokuapp.com/api`;

export const LOCALSTORAGE_TOKEN_KEY = 'task-mgt';

const responseCallback = (res: Response) => {
  if (res.status === 200) return res;
  return Promise.reject(
    res.statusText || 'Something went wrong'
    // res.response?.data.message || res.message || 'Something Went Wrong'
  );
};

export const errorCallback = (err: any) => {
  return axios.isAxiosError(err)
    ? err.message
    : 'Unexpected error : Something went wrong';
};

export const getSECURE_API = () => {
  const SECURE_API = axios.create({ baseURL });

  SECURE_API.interceptors.response.use((res: any) => res, responseCallback);
  // To help our auth middleware
  SECURE_API.interceptors.request.use((req: any) => {
    let token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  return SECURE_API;
};

export const API = axios.create({ baseURL });
API.interceptors.response.use((res: any) => res, responseCallback);
