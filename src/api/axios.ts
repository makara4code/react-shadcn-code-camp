import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import secureLocalStorage from 'react-secure-storage';
import rateLimit from 'axios-rate-limit';

export const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json",
  },
});

const api = rateLimit(apiInstance, { maxRequests: 2, perMilliseconds: 1000, maxRPS: 3 })

// Function to check if token is about to expire
export const isTokenExpiringSoon = (): boolean => {
  const accessToken = secureLocalStorage.getItem("accessToken") as string;
  if (!accessToken) return true;

  const currentTime = new Date().getTime();
  const expirationTime = new Date(secureLocalStorage.getItem("expireAt") as string).getTime();

  return expirationTime < currentTime;
};


// Function to get auth tokens
export const getAuthTokens = () => {
  const accessToken = secureLocalStorage.getItem('accessToken') ?? "" as string;
  const refreshToken = secureLocalStorage.getItem('refreshToken') ?? "" as string;
  const expires = secureLocalStorage.getItem('expires') as string;

  return {
    accessToken,
    refreshToken,
    expires: parseInt(expires),
  };
};


export const clearAuthTokens = () => {
  secureLocalStorage.clear();
};

// Function to refresh the token
const refreshAuthToken = async (): Promise<boolean> => {
  const refreshToken = secureLocalStorage.getItem("refreshToken");

  if (!refreshToken) return false;

  try {
    const response = await axios.post(`/api/auth/refresh`, {
      refresh_token: refreshToken,
      mode: "json"
    });

    if (response?.data?.data) {
      secureLocalStorage.setItem("accessToken", response.data.data.access_token);
      secureLocalStorage.setItem("refreshToken", response.data.data.refresh_token);
      secureLocalStorage.setItem("expires", response.data.data.expires.toString());
      secureLocalStorage.setItem("expireAt", new Date(Date.now() + response.data.data.expires).toISOString());
    }
    return true;
  } catch (error) {
    clearAuthTokens();
    return false;
  }
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = secureLocalStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = secureLocalStorage.getItem("accessToken") as string;

    if (accessToken) {
      if (isTokenExpiringSoon()) {
        const refreshed = await refreshAuthToken();

        if (!refreshed) {
          window.location.href = '/login';
          return Promise.reject('Session expired');
        }
      }

      config.headers['Authorization'] = `Bearer ${getAuthTokens()?.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor (in case the token expires between the check and the request)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        return api(originalRequest);
      } else {
        // Handle failed refresh (e.g., redirect to login)
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;