import _axios from "axios";
import Cookies from 'js-cookie';

const axios = _axios.create({
    // baseURL: "https://auctiont2305m20241011163331.azurewebsites.net",
    baseURL: "https://localhost:7006",
    timeout: 1000000,
});

// Request interceptor to attach the token to every request
axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            let errorMessage = `Error ${status}: ${error.response.statusText}`;
            switch (status) {
                case 404:
                    errorMessage = 'Resource not found (404).';
                    break;
                case 400:
                    errorMessage = 'Bad request (400).';
                    break;
                case 401:
                    errorMessage = 'Unauthorized (401). Please log in.'; // This is where your token might be invalid
                    break;
                case 403:
                    errorMessage = 'Forbidden (403). You do not have access.';
                    break;
                case 500:
                    errorMessage = 'Internal server error (500).';
                    break;
                default:
                    errorMessage = 'An unknown error occurred.';
            }

            // Uncomment to show error notification
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: errorMessage
            // });
            console.error(errorMessage); // Log the error message for debugging
        } else {
            console.error('Network error or no response from server.');
        }
        return Promise.reject(error);
    }
);

export default axios;