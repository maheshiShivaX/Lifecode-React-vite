import axios from 'axios';

// Base configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    timeout: 30000,
});

// Request interceptor for adding headers
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized, logging out...');
        }
        return Promise.reject(error);
    }
);

// Generic GET request
export const get = async (url, params = {}, config = {}) => {
    try {
        const token = sessionStorage.getItem('jwtToken');
        let updatedConfig = {
            ...config,
            headers: {
                ...config.headers,
            },
        };

        if (token) {
            updatedConfig.headers.Authorization = `Bearer ${token}`;
        }

        const response = await apiClient.get(url, { ...updatedConfig, params });
        return response.data;
    } catch (error) {
        console.error(`GET ${url} failed:`, error);
        throw error;
    }
};


// Generic POST request
export const post = async (url, data = {}, config = {}) => {
    try {
        // Ensure the Authorization header exists
        const token = sessionStorage.getItem('jwtToken');

        // Update config with Authorization and Content-Type headers
        const updatedConfig = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };

        const response = await apiClient.post(url, data, updatedConfig);

        return response.data;
    } catch (error) {
        console.error(`POST ${url} failed:`, error);

        // Handle specific cases of failed authorization
        if (error.response?.status === 401) {
            console.error('Authorization failed. Redirecting to login.');
        }
        throw error;
    }
};


// Add more methods (PUT, DELETE) if needed
export const put = async (url, data = {}, config = {}) => {
    try {
        const token = sessionStorage.getItem('jwtToken');

        const updatedConfig = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };

        const response = await apiClient.put(url, data, updatedConfig);
        return response.data;

    } catch (error) {
        console.error(`PUT ${url} failed:`, error);
        throw error;
    }
};

export const del = async (url, data = {}, config = {}) => {
    try {
        const token = sessionStorage.getItem('jwtToken');

        const updatedConfig = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: token ? `Bearer ${token}` : undefined,
            },
            data, // 👈 include data here!
        };

        const response = await apiClient.delete(url, updatedConfig);
        return response.data;
    } catch (error) {
        console.error(`DELETE ${url} failed:`, error);
        throw error;
    }
};

