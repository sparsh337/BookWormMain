import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const OAuth2Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuthData } = useAuth();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        const token = searchParams.get('token');
        if (token) {
            // Manually pass token as we are not logged in yet in the context/axios interceptor (maybe)
            api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setAuthData(token, res.data);
                    navigate('/');
                })
                .catch(err => {
                    console.error("Failed to fetch user after OAuth redirect", err);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate, setAuthData]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">Completing login...</span>
        </div>
    );
};

export default OAuth2Redirect;
