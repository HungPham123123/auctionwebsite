import React, { createContext, useContext, useState } from 'react';
import axios from '../utils/axios';
import Cookies from 'js-cookie'; // Import js-cookie

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        // Normal user login
        try {
            const response = await axios.post('/api/Auth/login', { email, password });
            const token = response.data.token;
            if (token) {
                Cookies.set('token', token, { expires: 30 / 1440 });
                setUser(response.data.user); // Set user state if needed
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            return errorMessage;
        }
    };

    const adminLogin = async (email, password) => {
        // Admin login function
        try {
            const response = await axios.post('/api/Auth/admin/login', { email, password });
            const token = response.data.token;
            if (token) {
                Cookies.set('token', token, { expires: 30 / 1440 });
                setUser(response.data.user); // Optionally set admin user
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            return errorMessage;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await axios.post('/api/Auth/register', {
                username,
                email,
                password,
            });

            if (response.status === 200) {
                // Handle successful signup if necessary
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            return errorMessage; // Return error message
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, adminLogin, signup, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
