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
        document.title = "Login | BookWorm";
        if (processed.current) return;
        processed.current = true;

        const token = searchParams.get('token');
        if (token) {
            api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setAuthData(token, res.data);
                    navigate('/');
                })
                .catch(err => {
                    console.error("OAuth2 Error", err);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate, setAuthData]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-700">Logging in with Google...</h2>
            </div>
        </div>
    );
};

export default OAuth2Redirect;
