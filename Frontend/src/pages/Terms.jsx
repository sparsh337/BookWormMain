import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Assuming you have this set up, or standard axios

const Terms = () => {
    const [terms, setTerms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                // Fetch from your Spring Boot backend which proxies to .NET
                const response = await api.get('/terms');
                setTerms(response.data);
            } catch (err) {
                console.error("Error fetching terms:", err);
                setError("Could not load terms. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, []);

    const handleAccept = () => {
        localStorage.setItem('terms_accepted', 'true');
        navigate('/'); // Go to home page
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading Terms...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">
                    {terms?.title || "Terms and Conditions"}
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Last Updated: {terms?.lastUpdated || "N/A"}
                </p>

                <div className="prose prose-sm mb-8 text-gray-700 whitespace-pre-line max-h-96 overflow-y-auto bg-gray-50 p-4 rounded border">
                    {terms?.content}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleAccept}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200"
                    >
                        I Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Terms;
